# Generated by Django 3.2.9 on 2021-12-06 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0003_alter_reviews_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]