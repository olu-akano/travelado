from django.db import models

# Create your models here.
class Reviews(models.Model):
    username = models.CharField(max_length=100)
    title = models.CharField(max_length = 200)
    rating = models.PositiveIntegerField()
    body = models.CharField(max_length = 1500)
    latitude = models.CharField(max_length = 30)
    longitude = models.CharField(max_length = 30)
    date = models.DateField(auto_now=False)

    def __str__(self):
        return f'{self.title}'