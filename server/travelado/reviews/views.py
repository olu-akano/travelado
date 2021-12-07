from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from .models import Reviews
from .serializers import ReviewsSerializer

# Create your views here.
class ListReviewsView(ListAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

class CreateReviewsView(CreateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

class UpdateReviewsView(UpdateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

class DeleteReviewsView(DestroyAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer
