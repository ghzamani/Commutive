# Generated by Django 3.1.2 on 2020-12-10 04:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0023_auto_20201210_0530'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='users_liked',
        ),
        migrations.CreateModel(
            name='CommentLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked_by', models.ManyToManyField(default=None, related_name='comments_users_liked', to=settings.AUTH_USER_MODEL)),
                ('liked_comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='liked_comment', to='post.comment')),
            ],
        ),
    ]