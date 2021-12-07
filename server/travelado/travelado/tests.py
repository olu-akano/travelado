from django.test import TestCase, Client
from django.urls import reverse


""" class TestAuthViews(TestCase):
    client = Client()

    def test_google_logout(self):
         response = self.client.get(reverse('logout'))
         assert "index.html" in [t.name for t in response.templates]
 """