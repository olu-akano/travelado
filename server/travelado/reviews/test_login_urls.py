from django.contrib.auth.models import User
from django.test import TestCase, Client
import pytest
from django.urls import reverse
import json
from model_bakery import baker
from .models import Reviews

pytestmark = pytest.mark.django_db

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

    def test_home_page_load(self):
        response = self.client.get(reverse('home'))
        self.assertRedirects(response, expected_url="/login/?next=/", status_code=302)

class TestModels(TestCase):
    def setUp(self):
        self.reviews = baker.make(Reviews) #title="Birmingham is too rowdy")

class TestTPostReviews(TestCase):
    def test_post_reviews(self):
        data = {
            "username": "juliana",
            "title": "I love the sun in Miami",
            "rating": 5,
            "body": "Went over for spring break and it was amazing!",
            "latitude": "25.7617° N",
            "longitude": "80.1918° W"
        }
        response = self.client.post("/reviews/create/", data=data)
        self.assertEqual(Reviews.objects.count(), 1)

