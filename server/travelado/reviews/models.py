from django.db import models

# Create your models here.
class Reviews(models.Model):
    username = models.CharField(max_length=100)
    title = models.CharField(max_length = 200)
    rating = models.PositiveIntegerField()
    body = models.CharField(max_length = 1500)
    latitude = models.IntegerField()
    longitude = models.IntegerField()
    date = models.DateField(auto_now=False)

    def __str__(self):
        return self.title