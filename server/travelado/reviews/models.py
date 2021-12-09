from django.db import models
import jwt

# Create your models here.
class Reviews(models.Model):
    username = models.CharField(max_length=100)
    title = models.CharField(max_length = 200)
    rating = models.PositiveIntegerField()
    body = models.CharField(max_length = 1500)
    latitude = models.CharField(max_length = 50)
    longitude = models.CharField(max_length = 50)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title}'


        
