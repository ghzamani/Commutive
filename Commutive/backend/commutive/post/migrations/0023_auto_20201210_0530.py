# Generated by Django 3.1.2 on 2020-12-10 02:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0022_auto_20201210_0520'),
    ]

    operations = [
        migrations.RenameField(
            model_name='postreport',
            old_name='report_by',
            new_name='reported_by',
        ),
    ]
