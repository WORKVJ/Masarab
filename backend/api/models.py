from django.db import models

class ProductCategory(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Product Categories"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Product(models.Model):
    MATERIAL_CHOICES = [
        ('frp', 'FRP / GRP (Fiberglass Reinforced Polymer)'),
        ('steel', 'Electro-Forged Carbon Steel'),
        ('stainless', 'Stainless Steel (304 / 316 / 316L)'),
        ('aluminum', 'High-Strength Aluminum Alloy'),
        ('ductile', 'Ductile Iron (Access Covers)'),
        ('alloys', 'Engineered Alloys, Plates & Pipe Fittings'),
        ('chemical', 'Specialty Industrial Chemical Formulations'),
        ('mechanical', 'Precision Mechanical & Actuation Systems'),
        ('safety', 'Certified Workforce Safety & PPE'),
        ('instrumentation', 'Precision Instrumentation & Sensors'),
    ]

    category = models.ForeignKey(ProductCategory, related_name='products', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    material_type = models.CharField(max_length=40, choices=MATERIAL_CHOICES, default='frp')
    short_description = models.CharField(max_length=350)
    full_description = models.TextField()
    standards = models.CharField(max_length=250, help_text="e.g. ASTM A123, BS 4592, ISO 1461, EN 124", blank=True)
    features = models.JSONField(default=list, blank=True, help_text="List of feature bullet points")
    specifications = models.JSONField(default=dict, blank=True, help_text="Key-value pairs of technical specs")
    applications = models.JSONField(default=list, blank=True, help_text="List of recommended industries/applications")
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'title']

    def __str__(self):
        return f"{self.title} ({self.get_material_type_display()})"


class ProjectCase(models.Model):
    title = models.CharField(max_length=220)
    client_or_sector = models.CharField(max_length=150)
    location = models.CharField(max_length=120, default="Saudi Arabia")
    solution_provided = models.CharField(max_length=300)
    details = models.TextField()
    metrics = models.CharField(max_length=150, blank=True, help_text="e.g. 4,200 m² Supplied • Zero Deflection")
    image_badge = models.CharField(max_length=80, blank=True, default="Oil & Gas / Infrastructure")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class QuoteRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('pricing', 'Pricing in Progress'),
        ('sent', 'Quote Sent to Client'),
        ('closed', 'Closed / Won'),
    ]

    rfq_number = models.CharField(max_length=30, unique=True, editable=False)
    full_name = models.CharField(max_length=150)
    company_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    project_location = models.CharField(max_length=150, blank=True, default="Saudi Arabia")
    product_category = models.CharField(max_length=120)
    estimated_quantity = models.CharField(max_length=100, blank=True)
    specifications_notes = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.rfq_number:
            import uuid
            self.rfq_number = f"RFQ-MA-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.rfq_number} - {self.company_name} ({self.full_name})"


class ContactInquiry(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} - {self.subject}"
