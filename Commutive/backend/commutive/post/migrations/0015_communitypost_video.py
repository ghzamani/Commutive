# Generated by Django 3.1.2 on 2020-12-02 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0014_remove_comment_post_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='communitypost',
            name='video',
            field=models.FileField(null=True, upload_to='posts/'),
        ),
    ]
