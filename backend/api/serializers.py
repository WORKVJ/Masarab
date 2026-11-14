from rest_framework import serializers
from .models import QuoteRequest, ContactInquiry

class QuoteRequestSerializer(serializers.ModelSerializer):
    rfq_number = serializers.CharField(read_only=True)

    class Meta:
        model = QuoteRequest
        fields = [
            'id', 'rfq_number', 'full_name', 'company_name', 'email', 'phone',
            'project_location', 'product_category', 'estimated_quantity',
            'specifications_notes', 'status', 'created_at'
        ]
        # visitors fill in the form; status is set by the team in the admin panel
        read_only_fields = ['status', 'created_at']


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        # only what the visitor types; status, internal notes and read time belong to the team
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['created_at']
