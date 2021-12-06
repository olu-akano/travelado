from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Reviews
from .serializers import ReviewsSerializer

# Create your views here.
class ReviewsView(ModelViewSet):
    http_method_names = ['get']
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

