from django.db import models

class QuoteRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'New'),
        ('pricing', 'Pricing in Progress'),
        ('sent', 'Quote Sent'),
        ('closed', 'Won'),
        ('lost', 'Lost'),
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
    notes = models.TextField(blank=True, help_text="Internal notes — never shown to the customer")
    read_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.rfq_number:
            import uuid
            self.rfq_number = f"RFQ-MA-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.rfq_number} - {self.company_name} ({self.full_name})"


class ContactInquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('replied', 'Replied'),
        ('closed', 'Closed'),
    ]

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(blank=True, help_text="Internal notes — never shown to the customer")
    read_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Contact inquiries"

    def __str__(self):
        return f"Inquiry from {self.name} - {self.subject}"


class SiteSettings(models.Model):
    """The company contact details shown across the website — one row, edited in the admin panel."""

    company = models.CharField(max_length=200, default='Masar Arabia First Trading Company')
    phone_display = models.CharField(max_length=40, default='+966 12 657 6896', help_text="As shown, e.g. +966 12 657 6896")
    email = models.EmailField(default='info@masararabia.com')
    address = models.TextField(
        default='Othman Bin Afan Street\nPO Box No. 16301\nJeddah 22234, Saudi Arabia',
        help_text="One line per row",
    )
    map_url = models.URLField(blank=True, default='https://maps.app.goo.gl/RAB2YFVWJQF3d8QG6')
    whatsapp = models.CharField(max_length=40, blank=True, help_text="Number with country code, e.g. +966 55 123 4567")
    working_hours = models.CharField(max_length=150, blank=True, help_text="e.g. Sun – Thu, 8:00 AM – 5:00 PM")
    facebook = models.URLField(blank=True, default='https://www.facebook.com/people/Masar-Arabia/100091987398412/')
    instagram = models.URLField(blank=True, default='https://www.instagram.com/masararabia/')
    linkedin = models.URLField(blank=True)
    contact_intro = models.TextField(
        blank=True,
        default='We understand the importance of approaching each work integrally and believe in the power of simple and easy communication.',
        help_text="Intro text at the top of the Contact page",
    )
    notify_emails = models.TextField(blank=True, help_text="Who gets an email for each new enquiry (comma separated)")
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.CharField(max_length=150, blank=True)

    class Meta:
        verbose_name = verbose_name_plural = "Site settings"

    def __str__(self):
        return "Site settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    @property
    def notify_list(self):
        return [e.strip() for e in self.notify_emails.replace(';', ',').split(',') if e.strip()]


class BlogPost(models.Model):
    """A blog article, written and published from the admin panel (shown at /blog on the website)."""

    STATUS_CHOICES = [('draft', 'Draft'), ('published', 'Published')]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, help_text="The web address: /blog/<slug>")
    excerpt = models.TextField(blank=True, help_text="Short summary shown on the blog list and in search results")
    body = models.TextField(blank=True, help_text="Article HTML (cleaned on save)")
    cover = models.CharField(max_length=300, blank=True, help_text="Cover image path, e.g. /media/blog/abc.webp")
    cover_alt = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=80, blank=True)
    author = models.CharField(max_length=120, blank=True, default='Masar Arabia')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    published_at = models.DateTimeField(null=True, blank=True, help_text="Shown as the post date; a future date schedules it")
    seo_title = models.CharField(max_length=70, blank=True)
    seo_description = models.CharField(max_length=170, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.CharField(max_length=150, blank=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title
