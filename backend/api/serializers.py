from rest_framework import serializers
from .models import ProductCategory, Product, ProjectCase, QuoteRequest, ContactInquiry

class ProductCategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'slug', 'description', 'order', 'product_count']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 'category_slug',
            'material_type', 'short_description', 'full_description', 'standards',
            'features', 'specifications', 'applications', 'is_featured', 'created_at'
        ]


class ProjectCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCase
        fields = '__all__'


class QuoteRequestSerializer(serializers.ModelSerializer):
    rfq_number = serializers.CharField(read_only=True)

    class Meta:
        model = QuoteRequest
        fields = [
            'id', 'rfq_number', 'full_name', 'company_name', 'email', 'phone',
            'project_location', 'product_category', 'estimated_quantity',
            'specifications_notes', 'status', 'created_at'
        ]


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'
