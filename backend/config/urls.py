from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django's built-in admin (fallback); the team uses the custom panel at /admin on the website
    path('django-admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

if settings.DEBUG:  # local development only; Nginx serves /media/ on the server
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
