"""
Blog: the public API the website reads (/api/blog/) and the admin panel API (/api/panel/blog/).

Article HTML from the panel's editor is cleaned with nh3 before it is stored, and uploaded images
are re-encoded (resized WebP), so nothing a browser could run ever reaches the public pages.
"""
import io
import re
import uuid

import nh3
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.db.models import Q
from django.utils import timezone
from django.utils.text import slugify
from PIL import Image, ImageOps, UnidentifiedImageError
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import BlogPost

BLOG_TAG = 'blog'

ALLOWED_TAGS = {
    'p', 'br', 'hr', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'ul', 'ol', 'li',
    'blockquote', 'code', 'pre', 'img', 'figure', 'figcaption',
}
ALLOWED_ATTRS = {'a': {'href', 'title', 'target'}, 'img': {'src', 'alt', 'title', 'width', 'height', 'loading'}}

MAX_UPLOAD = 10 * 1024 * 1024
MAX_WIDTH = 1920


def clean_html(html: str) -> str:
    return nh3.clean(
        html or '',
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRS,
        url_schemes={'http', 'https', 'mailto', 'tel'},
        link_rel='noopener noreferrer',
    ).strip()


def reading_minutes(html: str) -> int:
    words = len(re.sub(r'<[^>]+>', ' ', html or '').split())
    return max(1, round(words / 200))


def unique_slug(text: str, exclude_id=None) -> str:
    base = slugify(text)[:200] or 'post'
    slug, n = base, 2
    qs = BlogPost.objects.exclude(pk=exclude_id) if exclude_id else BlogPost.objects.all()
    while qs.filter(slug=slug).exists():
        slug = f'{base}-{n}'
        n += 1
    return slug


def save_image(upload) -> str:
    """Check it really is an image, shrink it to at most 1920px wide, store it as WebP; returns its /media URL."""
    if upload.size > MAX_UPLOAD:
        raise serializers.ValidationError({'file': 'The image is too large (10 MB maximum).'})
    try:
        img = Image.open(upload)
        img.load()
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError):
        raise serializers.ValidationError({'file': 'That file is not an image (use JPG, PNG or WebP).'})
    img = ImageOps.exif_transpose(img)
    if img.mode not in ('RGB', 'RGBA'):
        img = img.convert('RGBA' if img.mode in ('LA', 'P', 'PA') else 'RGB')
    if img.width > MAX_WIDTH:
        img = img.resize((MAX_WIDTH, round(img.height * MAX_WIDTH / img.width)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, 'WEBP', quality=82, method=6)
    name = default_storage.save(f'blog/{timezone.now():%Y/%m}/{uuid.uuid4().hex[:12]}.webp', ContentFile(buf.getvalue()))
    return default_storage.url(name)


def live_posts():
    return BlogPost.objects.filter(status='published', published_at__lte=timezone.now())


def is_live(post: BlogPost) -> bool:
    return post.status == 'published' and post.published_at is not None and post.published_at <= timezone.now()


def revalidate_blog():
    from .panel import revalidate_website  # avoid a circular import

    revalidate_website([BLOG_TAG])


# ── public (website) ─────────────────────────────────────────────────────────

class PublicListSerializer(serializers.ModelSerializer):
    reading_minutes = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ['slug', 'title', 'excerpt', 'cover', 'cover_alt', 'category', 'author', 'published_at', 'updated_at', 'reading_minutes']

    def get_reading_minutes(self, obj):
        return reading_minutes(obj.body)


class PublicDetailSerializer(PublicListSerializer):
    class Meta(PublicListSerializer.Meta):
        fields = PublicListSerializer.Meta.fields + ['body', 'seo_title', 'seo_description']


class PublicPages(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 500


class PublicBlogViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/blog/?page=&category=   ·   GET /api/blog/<slug>/   ·   GET /api/blog/categories/"""

    permission_classes = [AllowAny]
    pagination_class = PublicPages
    lookup_field = 'slug'

    def get_queryset(self):
        qs = live_posts()
        if cat := self.request.query_params.get('category'):
            qs = qs.filter(category__iexact=cat)
        return qs

    def get_serializer_class(self):
        return PublicDetailSerializer if self.action == 'retrieve' else PublicListSerializer

    @action(detail=False)
    def categories(self, request):
        cats = live_posts().exclude(category='').values_list('category', flat=True)
        return Response(sorted(set(cats), key=str.lower))


# ── admin panel ──────────────────────────────────────────────────────────────

class PanelBlogSerializer(serializers.ModelSerializer):
    slug = serializers.CharField(max_length=220, required=False, allow_blank=True)
    live = serializers.SerializerMethodField()
    reading_minutes = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'body', 'cover', 'cover_alt', 'category', 'author', 'status',
            'published_at', 'seo_title', 'seo_description', 'created_at', 'updated_at', 'updated_by',
            'live', 'reading_minutes',
        ]
        read_only_fields = ['created_at', 'updated_at', 'updated_by']

    def get_live(self, obj):
        return is_live(obj)

    def get_reading_minutes(self, obj):
        return reading_minutes(obj.body)

    def validate_body(self, value):
        return clean_html(value)

    def validate_cover(self, value):
        if value and not value.startswith('/media/'):
            raise serializers.ValidationError('Upload the cover image instead of pasting a link.')
        return value

    def validate(self, attrs):
        inst = self.instance
        title = attrs.get('title', inst.title if inst else '')
        if 'slug' in attrs or inst is None:
            slug = slugify(attrs.get('slug') or '')[:220]
            if slug and BlogPost.objects.exclude(pk=inst.pk if inst else None).filter(slug=slug).exists():
                raise serializers.ValidationError({'slug': 'Another post already uses this web address.'})
            attrs['slug'] = slug or unique_slug(title, inst.pk if inst else None)
        status = attrs.get('status', inst.status if inst else 'draft')
        if status == 'published' and not attrs.get('published_at', inst.published_at if inst else None):
            attrs['published_at'] = timezone.now()
        return attrs


class PanelPages(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class PanelBlogViewSet(viewsets.ModelViewSet):
    """Staff: list (search / status), create, edit, delete; POST upload/ stores an image."""

    permission_classes = [IsAdminUser]
    serializer_class = PanelBlogSerializer
    pagination_class = PanelPages

    def get_queryset(self):
        qs = BlogPost.objects.all()
        p = self.request.query_params
        if q := p.get('q', '').strip():
            qs = qs.filter(Q(title__icontains=q) | Q(excerpt__icontains=q) | Q(category__icontains=q))
        now = timezone.now()
        st = p.get('status')
        if st == 'draft':
            qs = qs.filter(status='draft')
        elif st == 'published':
            qs = qs.filter(status='published', published_at__lte=now)
        elif st == 'scheduled':
            qs = qs.filter(status='published', published_at__gt=now)
        return qs

    def _by(self):
        return self.request.user.get_full_name() or self.request.user.username

    def perform_create(self, serializer):
        serializer.save(updated_by=self._by())
        revalidate_blog()

    def perform_update(self, serializer):
        serializer.save(updated_by=self._by())
        revalidate_blog()

    def perform_destroy(self, instance):
        instance.delete()
        revalidate_blog()

    @action(detail=False, methods=['post'], parser_classes=[MultiPartParser])
    def upload(self, request):
        f = request.FILES.get('file')
        if not f:
            raise serializers.ValidationError({'file': 'Choose an image to upload.'})
        return Response({'url': save_image(f)}, status=201)

    @action(detail=False)
    def categories(self, request):
        cats = BlogPost.objects.exclude(category='').values_list('category', flat=True)
        return Response(sorted(set(cats), key=str.lower))
