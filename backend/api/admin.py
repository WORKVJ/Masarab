from django.contrib import admin
from .models import BlogPost, QuoteRequest, ContactInquiry, SiteSettings


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'published_at', 'category', 'updated_at')
    list_filter = ('status', 'category')
    search_fields = ('title', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('rfq_number', 'company_name', 'full_name', 'email', 'phone', 'product_category', 'status', 'created_at')
    list_filter = ('status', 'product_category', 'created_at')
    search_fields = ('rfq_number', 'company_name', 'full_name', 'email')
    readonly_fields = ('rfq_number', 'created_at')


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('company', 'phone_display', 'email', 'updated_at', 'updated_by')
