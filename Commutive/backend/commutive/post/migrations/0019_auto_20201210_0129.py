# Generated by Django 3.1.2 on 2020-12-09 21:59

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0018_auto_20201210_0102'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='LikePost',
            new_name='PostLike',
        ),
    ]
