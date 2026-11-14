import io
import shutil
import tempfile
from datetime import timedelta

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.utils import timezone
from PIL import Image
from django.test import TestCase
from rest_framework.test import APIClient

from .models import BlogPost, ContactInquiry, QuoteRequest, SiteSettings

User = get_user_model()


class PanelTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser('boss', 'boss@example.com', 'Str0ng-pass-123')
        self.staff = User.objects.create_user('staff', 'staff@example.com', 'Str0ng-pass-456', is_staff=True)
        self.c = APIClient()
        self.c.force_authenticate(self.admin)
        self.q = QuoteRequest.objects.create(
            full_name='Ali', company_name='Aramco', email='ali@example.com', phone='+966500000000',
            product_category='Cooling Towers', specifications_notes='2 towers',
        )
        self.m = ContactInquiry.objects.create(name='Sara', email='sara@example.com', subject='Valves', message='Price?')

    def test_public_forms_still_post_and_never_list(self):
        anon = APIClient()
        r = anon.post('/api/contact/', {'name': 'X', 'email': 'x@example.com', 'subject': 'S', 'message': 'M'}, format='json')
        self.assertEqual(r.status_code, 201)
        self.assertEqual(anon.get('/api/contact/').status_code, 405)

    def test_public_forms_cannot_set_internal_fields(self):
        anon = APIClient()
        r = anon.post('/api/contact/', {'name': 'X', 'email': 'x@example.com', 'subject': 'S', 'message': 'M', 'status': 'closed', 'notes': 'hacked', 'read_at': '2026-01-01T00:00:00Z'}, format='json')
        m = ContactInquiry.objects.get(pk=r.json()['id'])
        self.assertEqual((m.status, m.notes, m.read_at), ('new', '', None))
        r = anon.post('/api/rfq/', {'full_name': 'Y', 'company_name': 'C', 'email': 'y@example.com', 'phone': '1', 'product_category': 'Valves', 'specifications_notes': 'Need 4 valves', 'status': 'closed'}, format='json')
        self.assertEqual(r.status_code, 201, r.content)
        self.assertEqual(QuoteRequest.objects.get(pk=r.json()['id']).status, 'pending')

    def test_panel_requires_staff(self):
        anon = APIClient()
        for url in ['/api/panel/dashboard', '/api/panel/quotes', '/api/panel/messages', '/api/panel/settings', '/api/panel/auth/me']:
            self.assertIn(anon.get(url).status_code, (401, 403), url)

    def test_login_flow_with_csrf(self):
        c = APIClient(enforce_csrf_checks=True)
        c.get('/api/panel/auth/csrf')
        token = c.cookies['csrftoken'].value
        self.assertEqual(c.post('/api/panel/auth/login', {'username': 'boss', 'password': 'nope'}, format='json', HTTP_X_CSRFTOKEN=token).status_code, 400)
        self.assertEqual(c.post('/api/panel/auth/login', {'username': 'boss', 'password': 'Str0ng-pass-123'}, format='json').status_code, 403)  # no CSRF token
        r = c.post('/api/panel/auth/login', {'username': 'boss', 'password': 'Str0ng-pass-123'}, format='json', HTTP_X_CSRFTOKEN=token)
        self.assertEqual(r.status_code, 200)
        self.assertEqual(c.get('/api/panel/auth/me').json()['username'], 'boss')

    def test_non_staff_cannot_log_in(self):
        User.objects.create_user('cust', 'c@example.com', 'Str0ng-pass-789')
        r = APIClient().post('/api/panel/auth/login', {'username': 'cust', 'password': 'Str0ng-pass-789'}, format='json')
        self.assertEqual(r.status_code, 400)

    def test_quote_open_marks_read_and_updates(self):
        self.assertIsNone(self.q.read_at)
        self.assertEqual(self.c.get('/api/panel/dashboard').json()['quotes']['unread'], 1)
        self.c.get(f'/api/panel/quotes/{self.q.id}')
        self.q.refresh_from_db()
        self.assertIsNotNone(self.q.read_at)
        r = self.c.patch(f'/api/panel/quotes/{self.q.id}', {'status': 'sent', 'notes': 'Sent price', 'email': 'hack@x.com'}, format='json')
        self.assertEqual(r.status_code, 200)
        self.q.refresh_from_db()
        self.assertEqual((self.q.status, self.q.notes, self.q.email), ('sent', 'Sent price', 'ali@example.com'))

    def test_search_filter_export_delete(self):
        self.assertEqual(self.c.get('/api/panel/quotes?q=aramco').json()['count'], 1)
        self.assertEqual(self.c.get('/api/panel/quotes?q=nothing').json()['count'], 0)
        self.assertEqual(self.c.get('/api/panel/messages?status=new').json()['count'], 1)
        r = self.c.get('/api/panel/quotes/export')
        self.assertEqual(r.status_code, 200)
        self.assertIn('Aramco', r.content.decode('utf-8-sig'))
        self.assertEqual(self.c.delete(f'/api/panel/messages/{self.m.id}').status_code, 204)

    def test_settings_edit_shows_on_public_endpoint(self):
        r = self.c.patch('/api/panel/settings', {'phone_display': '+966 12 000 0000', 'address': 'Line 1\nLine 2', 'notify_emails': 'a@x.com, b@x.com'}, format='json')
        self.assertEqual(r.status_code, 200)
        pub = APIClient().get('/api/site-settings').json()
        self.assertEqual(pub['phone_display'], '+966 12 000 0000')
        self.assertEqual(pub['address_lines'], ['Line 1', 'Line 2'])
        self.assertNotIn('notify_emails', pub)
        self.assertEqual(SiteSettings.load().notify_list, ['a@x.com', 'b@x.com'])
        self.assertEqual(self.c.patch('/api/panel/settings', {'notify_emails': 'not-an-email'}, format='json').status_code, 400)

    def test_team_is_superuser_only_and_protects_self(self):
        staff = APIClient()
        staff.force_authenticate(self.staff)
        self.assertEqual(staff.get('/api/panel/team').status_code, 403)
        self.assertEqual(staff.get('/api/panel/quotes').status_code, 200)
        r = self.c.post('/api/panel/team', {'username': 'new', 'password': 'An0ther-good-pass', 'email': 'n@example.com'}, format='json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(User.objects.get(username='new').is_staff)
        self.assertEqual(self.c.post('/api/panel/team', {'username': 'weak', 'password': '123'}, format='json').status_code, 400)
        self.assertEqual(self.c.delete(f'/api/panel/team/{self.admin.id}').status_code, 400)
        self.assertEqual(self.c.patch(f'/api/panel/team/{self.admin.id}', {'is_active': False}, format='json').status_code, 400)

    def test_change_password(self):
        r = self.c.post('/api/panel/auth/password', {'current_password': 'wrong', 'new_password': 'Brand-new-pass-1'}, format='json')
        self.assertEqual(r.status_code, 400)
        r = self.c.post('/api/panel/auth/password', {'current_password': 'Str0ng-pass-123', 'new_password': 'Brand-new-pass-1'}, format='json')
        self.assertEqual(r.status_code, 200)
        self.admin.refresh_from_db()
        self.assertTrue(self.admin.check_password('Brand-new-pass-1'))


MEDIA_TMP = tempfile.mkdtemp()


@override_settings(MEDIA_ROOT=MEDIA_TMP, NEXT_REVALIDATE_URL='')
class BlogTests(TestCase):
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(MEDIA_TMP, ignore_errors=True)

    def setUp(self):
        self.staff = User.objects.create_user('writer', 'w@example.com', 'Str0ng-pass-456', is_staff=True)
        self.c = APIClient()
        self.c.force_authenticate(self.staff)

    def test_panel_needs_staff(self):
        self.assertIn(APIClient().get('/api/panel/blog').status_code, (401, 403))
        self.assertIn(APIClient().post('/api/panel/blog', {'title': 'x'}, format='json').status_code, (401, 403))

    def test_create_draft_then_publish(self):
        r = self.c.post('/api/panel/blog', {'title': 'Choosing FRP Cooling Towers', 'body': '<p>Hello</p>'}, format='json')
        self.assertEqual(r.status_code, 201, r.content)
        post = r.json()
        self.assertEqual(post['slug'], 'choosing-frp-cooling-towers')
        self.assertEqual(post['status'], 'draft')
        # drafts are invisible to the public
        self.assertEqual(APIClient().get('/api/blog/').json()['count'], 0)
        self.assertEqual(APIClient().get('/api/blog/choosing-frp-cooling-towers/').status_code, 404)
        r = self.c.patch(f"/api/panel/blog/{post['id']}", {'status': 'published'}, format='json')
        self.assertTrue(r.json()['live'])
        self.assertIsNotNone(r.json()['published_at'])
        pub = APIClient().get('/api/blog/choosing-frp-cooling-towers/')
        self.assertEqual(pub.status_code, 200)
        self.assertEqual(pub.json()['body'], '<p>Hello</p>')
        # a second post with the same title gets its own address
        r2 = self.c.post('/api/panel/blog', {'title': 'Choosing FRP Cooling Towers'}, format='json')
        self.assertEqual(r2.json()['slug'], 'choosing-frp-cooling-towers-2')
        # but a hand-typed duplicate is refused
        r3 = self.c.patch(f"/api/panel/blog/{r2.json()['id']}", {'slug': 'choosing-frp-cooling-towers'}, format='json')
        self.assertEqual(r3.status_code, 400)

    def test_scheduled_posts_stay_hidden(self):
        BlogPost.objects.create(title='Later', slug='later', status='published', published_at=timezone.now() + timedelta(days=2))
        self.assertEqual(APIClient().get('/api/blog/').json()['count'], 0)
        self.assertEqual(self.c.get('/api/panel/blog?status=scheduled').json()['count'], 1)

    def test_body_html_is_cleaned(self):
        dirty = '<p onclick="x()">Hi<script>alert(1)</script></p><a href="javascript:alert(1)">bad</a><a href="https://x.com">ok</a><img src="/media/a.webp" onerror="x()">'
        r = self.c.post('/api/panel/blog', {'title': 'XSS', 'body': dirty, 'status': 'published'}, format='json')
        body = r.json()['body']
        for bad in ('script', 'onclick', 'javascript:', 'onerror'):
            self.assertNotIn(bad, body)
        self.assertIn('href="https://x.com"', body)
        self.assertIn('rel="noopener noreferrer"', body)

    def test_cover_must_be_uploaded(self):
        r = self.c.post('/api/panel/blog', {'title': 'C', 'cover': 'https://evil.example/x.jpg'}, format='json')
        self.assertEqual(r.status_code, 400)

    def test_image_upload_is_resized_to_webp(self):
        buf = io.BytesIO()
        Image.new('RGB', (3000, 1500), 'navy').save(buf, 'PNG')
        f = SimpleUploadedFile('big.png', buf.getvalue(), content_type='image/png')
        r = self.c.post('/api/panel/blog/upload', {'file': f}, format='multipart')
        self.assertEqual(r.status_code, 201, r.content)
        url = r.json()['url']
        self.assertTrue(url.startswith('/media/blog/') and url.endswith('.webp'))
        saved = Image.open(f"{MEDIA_TMP}/{url.removeprefix('/media/')}")
        self.assertEqual((saved.format, saved.width), ('WEBP', 1920))
        fake = SimpleUploadedFile('x.png', b'not an image', content_type='image/png')
        self.assertEqual(self.c.post('/api/panel/blog/upload', {'file': fake}, format='multipart').status_code, 400)
        self.assertIn(APIClient().post('/api/panel/blog/upload', {}, format='multipart').status_code, (401, 403))

    def test_public_categories(self):
        now = timezone.now()
        BlogPost.objects.create(title='A', slug='a', category='Water', status='published', published_at=now)
        BlogPost.objects.create(title='B', slug='b', category='Safety', status='draft')
        self.assertEqual(APIClient().get('/api/blog/categories/').json(), ['Water'])
        self.assertEqual(APIClient().get('/api/blog/?category=water').json()['count'], 1)

