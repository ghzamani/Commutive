# Generated by Django 3.1.2 on 2020-11-24 11:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('community', '0003_auto_20201116_1128'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.TextField(blank=True)),
                ('photo', models.ImageField(null=True, upload_to='post')),
                ('author', models.CharField(blank=True, max_length=150)),
                ('community_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='community.community')),
            ],
        ),
    ]