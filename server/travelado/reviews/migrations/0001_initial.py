# Generated by Django 3.2.9 on 2021-12-08 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=200)),
                ('rating', models.PositiveIntegerField()),
                ('body', models.CharField(max_length=1500)),
                ('latitude', models.CharField(max_length=30)),
                ('longitude', models.CharField(max_length=30)),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
