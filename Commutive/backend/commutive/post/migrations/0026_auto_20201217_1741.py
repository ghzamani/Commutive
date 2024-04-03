# Generated by Django 3.1.2 on 2020-12-17 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0025_auto_20201212_0119'),
    ]

    operations = [
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uploaded_file', models.FileField(blank=True, null=True, upload_to='posts/')),
            ],
        ),
        migrations.RemoveField(
            model_name='communitypost',
            name='myFile',
        ),
        migrations.AddField(
            model_name='communitypost',
            name='files',
            field=models.ManyToManyField(blank=True, related_name='post', to='post.Media'),
        ),
    ]
