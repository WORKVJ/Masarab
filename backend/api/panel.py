"""
API for the custom admin panel (the website's /admin pages).

Everything here needs a signed-in staff account (Django session cookie + CSRF token);
team management additionally needs a superuser. Public, unauthenticated endpoints live in views.py.
"""
import csv
import json
import threading
import urllib.request
from datetime import timedelta

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model, login, logout, update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db.models import Count, Q
from django.db.models.functions import TruncDate
from django.http import HttpResponse
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import mixins, serializers, status, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action, api_view, permission_classes, throttle_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, BasePermission, IsAdminUser
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import ContactInquiry, QuoteRequest, SiteSettings

User = get_user_model()


# ── helpers ──────────────────────────────────────────────────────────────────

class IsSuperuser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_active and request.user.is_superuser)


class LoginThrottle(AnonRateThrottle):
    """Slows down password guessing: 8 attempts a minute per IP."""
    scope = 'panel_login'
    rate = '8/min'


class Pages(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


def user_data(user):
    return {
        'id': user.id,
        'username': user.username,
        'name': user.get_full_name() or user.username,
        'email': user.email,
        'is_superuser': user.is_superuser,
    }


def revalidate_website(tags=('site-settings',)):
    """Ask the Next.js server to drop its cached copy of these data sets (runs in the background)."""
    url, secret = settings.NEXT_REVALIDATE_URL, settings.REVALIDATE_SECRET
    if not url or not secret:
        return
    body = json.dumps({'tags': list(tags)}).encode()

    def ping():
        try:
            req = urllib.request.Request(
                url, data=body, method='POST', headers={'x-revalidate-secret': secret, 'Content-Type': 'application/json'}
            )
            urllib.request.urlopen(req, timeout=5).read()
        except Exception:
            pass  # the website still refreshes on its own within the hour

    threading.Thread(target=ping, daemon=True).start()


# ── auth ─────────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def csrf(request):
    """Sets the csrftoken cookie the panel sends back as X-CSRFToken."""
    return Response({'ok': True})


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([LoginThrottle])
def login_view(request):
    SessionAuthentication().enforce_csrf(request)
    user = authenticate(request, username=request.data.get('username', '').strip(), password=request.data.get('password', ''))
    if user is None or not user.is_active or not user.is_staff:
        return Response({'detail': 'Wrong username or password.'}, status=status.HTTP_400_BAD_REQUEST)
    login(request, user)
    return Response(user_data(user))


@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    logout(request)
    return Response({'ok': True})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def me(request):
    """The signed-in user plus unread counts for the sidebar badges."""
    return Response({
        **user_data(request.user),
        'unread': {
            'quotes': QuoteRequest.objects.filter(read_at__isnull=True).count(),
            'messages': ContactInquiry.objects.filter(read_at__isnull=True).count(),
        },
    })


@api_view(['POST'])
@permission_classes([IsAdminUser])
def change_password(request):
    user = request.user
    if not user.check_password(request.data.get('current_password', '')):
        return Response({'detail': 'Your current password is not correct.'}, status=status.HTTP_400_BAD_REQUEST)
    new = request.data.get('new_password', '')
    try:
        validate_password(new, user)
    except DjangoValidationError as e:
        return Response({'detail': ' '.join(e.messages)}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(new)
    user.save()
    update_session_auth_hash(request, user)  # stay signed in
    return Response({'ok': True})


# ── dashboard ────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard(request):
    now = timezone.now()
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    since = (now - timedelta(days=29)).replace(hour=0, minute=0, second=0, microsecond=0)

    def summary(model, new_status):
        qs = model.objects.all()
        return {
            'total': qs.count(),
            'new': qs.filter(status=new_status).count(),
            'unread': qs.filter(read_at__isnull=True).count(),
            'this_month': qs.filter(created_at__gte=month_start).count(),
            'by_status': {row['status']: row['n'] for row in qs.values('status').annotate(n=Count('id'))},
        }

    def per_day(model):
        rows = (
            model.objects.filter(created_at__gte=since)
            .annotate(day=TruncDate('created_at'))
            .values('day')
            .annotate(n=Count('id'))
        )
        return {str(r['day']): r['n'] for r in rows}

    q_days, m_days = per_day(QuoteRequest), per_day(ContactInquiry)
    days = [(since + timedelta(days=i)).date().isoformat() for i in range(30)]

    return Response({
        'quotes': summary(QuoteRequest, 'pending'),
        'messages': summary(ContactInquiry, 'new'),
        'last_30_days': [{'date': d, 'quotes': q_days.get(d, 0), 'messages': m_days.get(d, 0)} for d in days],
        'top_products': list(
            QuoteRequest.objects.values('product_category').annotate(n=Count('id')).order_by('-n')[:6]
        ),
        'recent_quotes': QuoteSerializer(QuoteRequest.objects.all()[:5], many=True).data,
        'recent_messages': MessageSerializer(ContactInquiry.objects.all()[:5], many=True).data,
    })


# ── enquiries ────────────────────────────────────────────────────────────────

class QuoteSerializer(serializers.ModelSerializer):
    status_label = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = QuoteRequest
        fields = [
            'id', 'rfq_number', 'full_name', 'company_name', 'email', 'phone', 'project_location',
            'product_category', 'estimated_quantity', 'specifications_notes', 'status', 'status_label',
            'notes', 'read_at', 'created_at', 'updated_at',
        ]
        read_only_fields = [f for f in fields if f not in ('status', 'notes')]


class MessageSerializer(serializers.ModelSerializer):
    status_label = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ContactInquiry
        fields = [
            'id', 'name', 'email', 'phone', 'subject', 'message', 'status', 'status_label',
            'notes', 'read_at', 'created_at', 'updated_at',
        ]
        read_only_fields = [f for f in fields if f not in ('status', 'notes')]


class EnquiryViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """List / search / filter, open (marks as read), update status + notes, delete, CSV export."""
    permission_classes = [IsAdminUser]
    pagination_class = Pages
    http_method_names = ['get', 'patch', 'post', 'delete', 'options']
    search_fields: tuple = ()
    csv_columns: list = []

    def get_queryset(self):
        qs = self.queryset.model.objects.all()
        p = self.request.query_params
        if p.get('status'):
            qs = qs.filter(status=p['status'])
        if p.get('unread') == '1':
            qs = qs.filter(read_at__isnull=True)
        if p.get('q'):
            cond = Q()
            for f in self.search_fields:
                cond |= Q(**{f'{f}__icontains': p['q'].strip()})
            qs = qs.filter(cond)
        return qs

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.read_at is None:
            obj.read_at = timezone.now()
            obj.save(update_fields=['read_at'])
        return Response(self.get_serializer(obj).data)

    @action(detail=True, methods=['post'])
    def unread(self, request, pk=None):
        obj = self.get_object()
        obj.read_at = None
        obj.save(update_fields=['read_at'])
        return Response(self.get_serializer(obj).data)

    @action(detail=False, methods=['get'])
    def export(self, request):
        stamp = timezone.localtime().strftime('%Y-%m-%d')
        res = HttpResponse(content_type='text/csv; charset=utf-8')
        res['Content-Disposition'] = f'attachment; filename="{self.export_name}-{stamp}.csv"'
        res.write('\ufeff')  # so Excel opens Arabic / accented names correctly
        w = csv.writer(res)
        w.writerow([label for label, _ in self.csv_columns])
        for obj in self.get_queryset():
            w.writerow([get(obj) for _, get in self.csv_columns])
        return res


def _when(o):
    return timezone.localtime(o.created_at).strftime('%Y-%m-%d %H:%M')


class QuoteViewSet(EnquiryViewSet):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteSerializer
    search_fields = ('rfq_number', 'full_name', 'company_name', 'email', 'phone', 'product_category', 'specifications_notes')
    export_name = 'quote-requests'
    csv_columns = [
        ('RFQ', lambda o: o.rfq_number), ('Received', _when), ('Status', lambda o: o.get_status_display()),
        ('Name', lambda o: o.full_name), ('Company', lambda o: o.company_name), ('Email', lambda o: o.email),
        ('Phone', lambda o: o.phone), ('Location', lambda o: o.project_location), ('Product', lambda o: o.product_category),
        ('Quantity', lambda o: o.estimated_quantity), ('Requirements', lambda o: o.specifications_notes), ('Notes', lambda o: o.notes),
    ]


class MessageViewSet(EnquiryViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = MessageSerializer
    search_fields = ('name', 'email', 'phone', 'subject', 'message')
    export_name = 'contact-messages'
    csv_columns = [
        ('Received', _when), ('Status', lambda o: o.get_status_display()), ('Name', lambda o: o.name),
        ('Email', lambda o: o.email), ('Phone', lambda o: o.phone), ('Subject', lambda o: o.subject),
        ('Message', lambda o: o.message), ('Notes', lambda o: o.notes),
    ]


# ── contact details (site settings) ──────────────────────────────────────────

class SiteSettingsSerializer(serializers.ModelSerializer):
    email_configured = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        exclude = ['id']
        read_only_fields = ['updated_at', 'updated_by']

    def get_email_configured(self, obj):
        return bool(settings.EMAIL_HOST)

    def validate_notify_emails(self, value):
        bad = [e for e in value.replace(';', ',').split(',') if e.strip() and '@' not in e]
        if bad:
            raise serializers.ValidationError(f'Not an email address: {bad[0].strip()}')
        return value


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAdminUser])
def site_settings(request):
    obj = SiteSettings.load()
    if request.method == 'GET':
        return Response(SiteSettingsSerializer(obj).data)
    ser = SiteSettingsSerializer(obj, data=request.data, partial=True)
    ser.is_valid(raise_exception=True)
    ser.save(updated_by=request.user.get_full_name() or request.user.username)
    revalidate_website()
    return Response(ser.data)


# ── team ─────────────────────────────────────────────────────────────────────

class TeamSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_active', 'last_login', 'date_joined', 'password']
        read_only_fields = ['last_login', 'date_joined']

    def validate(self, attrs):
        pw = attrs.get('password')
        if self.instance is None and not pw:
            raise serializers.ValidationError({'password': 'Set a password for the new account.'})
        if pw:
            try:
                validate_password(pw, self.instance)
            except DjangoValidationError as e:
                raise serializers.ValidationError({'password': ' '.join(e.messages)})
        return attrs

    def create(self, data):
        pw = data.pop('password')
        user = User(**data, is_staff=True)
        user.set_password(pw)
        user.save()
        return user

    def update(self, user, data):
        pw = data.pop('password', None)
        for k, v in data.items():
            setattr(user, k, v)
        if pw:
            user.set_password(pw)
        user.is_staff = True
        user.save()
        return user


class TeamViewSet(viewsets.ModelViewSet):
    """Panel accounts (superusers only). You can't disable, demote or delete yourself."""
    permission_classes = [IsSuperuser]
    serializer_class = TeamSerializer
    queryset = User.objects.filter(is_staff=True).order_by('username')
    http_method_names = ['get', 'post', 'patch', 'delete', 'options']

    def perform_update(self, ser):
        if ser.instance == self.request.user and (
            ser.validated_data.get('is_active') is False or ser.validated_data.get('is_superuser') is False
        ):
            raise serializers.ValidationError({'detail': "You can't disable or demote your own account."})
        ser.save()

    def perform_destroy(self, user):
        if user == self.request.user:
            raise serializers.ValidationError({'detail': "You can't delete your own account."})
        user.delete()
