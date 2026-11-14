from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter, SimpleRouter

from . import blog, panel
from .views import (
    ContactInquiryViewSet,
    QuoteRequestViewSet,
    health_check,
    public_site_settings,
)

router = DefaultRouter()
router.register(r'rfq', QuoteRequestViewSet, basename='rfq')
router.register(r'contact', ContactInquiryViewSet, basename='contact')


class OptionalSlashRouter(SimpleRouter):
    """Accepts URLs with or without the trailing slash (the Next.js dev proxy drops it)."""

    def __init__(self):
        super().__init__()
        self.trailing_slash = '/?'


# public blog (read-only); slash optional so it also works through the Next.js dev proxy
blog_router = OptionalSlashRouter()
blog_router.register(r'blog', blog.PublicBlogViewSet, basename='blog')

# admin panel API
panel_router = OptionalSlashRouter()
panel_router.register(r'quotes', panel.QuoteViewSet, basename='panel-quote')
panel_router.register(r'messages', panel.MessageViewSet, basename='panel-message')
panel_router.register(r'team', panel.TeamViewSet, basename='panel-team')
panel_router.register(r'blog', blog.PanelBlogViewSet, basename='panel-blog')

panel_urls = [
    re_path(r'^auth/csrf/?$', panel.csrf),
    re_path(r'^auth/login/?$', panel.login_view),
    re_path(r'^auth/logout/?$', panel.logout_view),
    re_path(r'^auth/me/?$', panel.me),
    re_path(r'^auth/password/?$', panel.change_password),
    re_path(r'^dashboard/?$', panel.dashboard),
    re_path(r'^settings/?$', panel.site_settings),
    *panel_router.urls,
]

urlpatterns = [
    path('health/', health_check, name='health-check'),
    re_path(r'^site-settings/?$', public_site_settings, name='site-settings'),
    path('panel/', include(panel_urls)),
    *blog_router.urls,
    path('', include(router.urls)),
]
