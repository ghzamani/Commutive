# Generated by Django 3.1.2 on 2020-11-26 19:34

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0010_remove_communitypost_reporting_reason'),
    ]

    operations = [
        migrations.AddField(
            model_name='communitypost',
            name='users_liked',
            field=models.ManyToManyField(default=None, related_name='like', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='communitypost',
            name='users_reported',
            field=models.ManyToManyField(default=None, related_name='report', to=settings.AUTH_USER_MODEL),
        ),
    ]
