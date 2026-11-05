from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    health_check,
    ProductCategoryViewSet,
    ProductViewSet,
    ProjectCaseViewSet,
    QuoteRequestViewSet,
    ContactInquiryViewSet
)

router = DefaultRouter()
router.register(r'categories', ProductCategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'projects', ProjectCaseViewSet, basename='project')
router.register(r'rfq', QuoteRequestViewSet, basename='rfq')
router.register(r'contact', ContactInquiryViewSet, basename='contact')

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('', include(router.urls)),
]
