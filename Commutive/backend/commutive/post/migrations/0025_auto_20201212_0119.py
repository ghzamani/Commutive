# Generated by Django 3.1.2 on 2020-12-11 21:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0003_auto_20201116_1128'),
        ('post', '0024_auto_20201210_0824'),
    ]

    operations = [
        migrations.AlterField(
            model_name='communitypost',
            name='communityID',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='community', to='community.community'),
        ),
    ]
