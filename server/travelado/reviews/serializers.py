from rest_framework import serializers
from .models import Reviews

class ReviewsSerializer(ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'
