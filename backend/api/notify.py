"""Email the team when a new quote request or contact message arrives (only if SMTP is configured)."""
import threading

from django.conf import settings
from django.core.mail import EmailMessage

from .models import SiteSettings


def _send(subject, body, recipients, reply_to):
    try:
        EmailMessage(subject, body, settings.DEFAULT_FROM_EMAIL, recipients, reply_to=[reply_to] if reply_to else None).send()
    except Exception:
        pass  # the enquiry is already saved; it shows in the admin panel regardless


def notify_new(subject, lines, reply_to=''):
    if not settings.EMAIL_HOST:
        return
    recipients = SiteSettings.load().notify_list
    if not recipients:
        return
    body = '\n'.join(lines) + f'\n\nOpen in the admin panel: {settings.PANEL_URL}\n'
    threading.Thread(target=_send, args=(subject, body, recipients, reply_to), daemon=True).start()

