from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse
import json

class BaseTestCase(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user("username", "test56user")

class TestViews(BaseTestCase):
    client = Client()

    def test_signup(self):
        response = self.client.get(reverse('signup'))
        assert "registration/signup.html" in [t.name for t in response.templates]

    def test_get_token(self):
        response = self.client.get(reverse('current_user'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content)['token'], "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IiIsInNvdXJjZSI6InRyYXZlbGFkbyJ9.sDc-PK15ie1QVWKnduWJj0Pv5IU1dYXO5qVQFXIHLbI")
    
class TestAuthViews(BaseTestCase):
    def setUp(self):
        self.client = Client()
        self.client.login(username="username", password="test56user")