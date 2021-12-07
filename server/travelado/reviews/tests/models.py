from django.test import TestCase
from reviews.models import Reviews
from model_bakery import baker

class TestReviewsModel(TestCase):
    def setUp(self):
        self.reviews = baker.make('Reviews')

    def test_using_reviews(self):
        self.assertIsInstance(self.reviews, Reviews)