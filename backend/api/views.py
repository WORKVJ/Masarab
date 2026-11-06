from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ProductCategory, Product, ProjectCase, QuoteRequest, ContactInquiry
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
    # Public endpoints accept new submissions only; the team reads them in Django admin.
    # (Allowing GET here would let anyone list every customer's name, email and phone.)
    http_method_names = ['post', 'options']


class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all().order_by('-created_at')
    serializer_class = ContactInquirySerializer
    # Public endpoints accept new submissions only; the team reads them in Django admin.
    # (Allowing GET here would let anyone list every customer's name, email and phone.)
    http_method_names = ['post', 'options']
