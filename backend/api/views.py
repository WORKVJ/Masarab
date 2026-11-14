from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ProductCategory, Product, ProjectCase, QuoteRequest, ContactInquiry, SiteSettings
from .notify import notify_new
from .serializers import (
    ProductCategorySerializer,
    ProductSerializer,
    ProjectCaseSerializer,
    QuoteRequestSerializer,
    ContactInquirySerializer
)

@api_view(['GET'])
def health_check(request):
    return Response({
        "status": "healthy",
        "system": "Masar Arabia Industrial Portal API",
        "version": "2.0.0",
        "market": "Saudi Arabia & GCC Industrial Infrastructure"
    }, status=status.HTTP_200_OK)


class ProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().select_related('category')
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        material = self.request.query_params.get('material')
        featured = self.request.query_params.get('featured')
        search = self.request.query_params.get('search')

        if category:
            qs = qs.filter(category__slug=category)
        if material:
            qs = qs.filter(material_type=material)
        if featured == 'true':
            qs = qs.filter(is_featured=True)
        if search:
            qs = qs.filter(title__icontains=search) | qs.filter(short_description__icontains=search)
        return qs


class ProjectCaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProjectCase.objects.all().order_by('-created_at')
    serializer_class = ProjectCaseSerializer


class QuoteRequestViewSet(viewsets.ModelViewSet):
    queryset = QuoteRequest.objects.all().order_by('-created_at')
    serializer_class = QuoteRequestSerializer
    # Public endpoints accept new submissions only; the team reads them in the admin panel.
    # (Allowing GET here would let anyone list every customer's name, email and phone.)
    http_method_names = ['post', 'options']

    def perform_create(self, serializer):
        q = serializer.save()
        notify_new(
            f'New quote request {q.rfq_number} — {q.company_name}',
            [
                f'RFQ: {q.rfq_number}', f'Name: {q.full_name}', f'Company: {q.company_name}',
                f'Email: {q.email}', f'Phone: {q.phone}', f'Location: {q.project_location}',
                f'Product: {q.product_category}', f'Quantity: {q.estimated_quantity}', '', q.specifications_notes,
            ],
            reply_to=q.email,
        )


class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all().order_by('-created_at')
    serializer_class = ContactInquirySerializer
    # Public endpoints accept new submissions only; the team reads them in the admin panel.
    # (Allowing GET here would let anyone list every customer's name, email and phone.)
    http_method_names = ['post', 'options']

    def perform_create(self, serializer):
        m = serializer.save()
        notify_new(
            f'New website message — {m.subject}',
            [f'Name: {m.name}', f'Email: {m.email}', f'Phone: {m.phone}', f'Subject: {m.subject}', '', m.message],
            reply_to=m.email,
        )


@api_view(['GET'])
def public_site_settings(request):
    """Contact details for the website (public — never includes the notification emails)."""
    s = SiteSettings.load()
    return Response({
        'company': s.company,
        'phone_display': s.phone_display,
        'email': s.email,
        'address_lines': [line.strip() for line in s.address.splitlines() if line.strip()],
        'map_url': s.map_url,
        'whatsapp': s.whatsapp,
        'working_hours': s.working_hours,
        'facebook': s.facebook,
        'instagram': s.instagram,
        'linkedin': s.linkedin,
        'contact_intro': s.contact_intro,
    })
