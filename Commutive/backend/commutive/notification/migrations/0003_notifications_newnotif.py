# Generated by Django 3.1.2 on 2021-02-05 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0002_auto_20210101_2034'),
    ]

    operations = [
        migrations.AddField(
            model_name='notifications',
            name='newNotif',
            field=models.BooleanField(default=True),
        ),
    ]
