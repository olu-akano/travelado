from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse

class BaseTestCase(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user("username", "test56user")

class TestViews(BaseTestCase):
    client = Client()

    def signup(self):
         response = self.client.get(reverse('signup'))
         assert "registration/signup.html" in [t.name for t in response.templates]
    
class TestAuthViews(BaseTestCase):
    def setUp(self):
        self.client = Client()
        self.client.login(username="username", password="test56user")
