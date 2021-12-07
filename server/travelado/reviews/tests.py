from django.test import TestCase, Client
from django.urls import reverse


class TestViews(TestCase):
    client = Client()

    def test_index(self):
         response = self.client.get(reverse('index'))
         assert "index.html" in [t.name for t in response.templates]