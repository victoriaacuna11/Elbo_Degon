# Generated by Django 3.0.2 on 2020-03-01 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_tax'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tax',
            name='tax',
            field=models.FloatField(),
        ),
    ]
