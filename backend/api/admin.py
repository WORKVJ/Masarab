from django.contrib import admin
from .models import ProductCategory, Product, ProjectCase, QuoteRequest, ContactInquiry

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'material_type', 'standards', 'is_featured', 'created_at')
    list_filter = ('category', 'material_type', 'is_featured')
    search_fields = ('title', 'short_description', 'standards')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ProjectCase)
class ProjectCaseAdmin(admin.ModelAdmin):
    list_display = ('title', 'client_or_sector', 'location', 'metrics', 'created_at')
    search_fields = ('title', 'client_or_sector', 'solution_provided')


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('rfq_number', 'company_name', 'full_name', 'email', 'phone', 'product_category', 'status', 'created_at')
    list_filter = ('status', 'product_category', 'created_at')
    search_fields = ('rfq_number', 'company_name', 'full_name', 'email')
    readonly_fields = ('rfq_number', 'created_at')


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
