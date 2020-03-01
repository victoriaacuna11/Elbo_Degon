# Generated by Django 3.0.2 on 2020-03-01 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200301_0353'),
    ]

    operations = [
        migrations.AlterField(
            model_name='monthemployee',
            name='month',
            field=models.CharField(choices=[('Enero', 'Enero'), ('Febrero', 'Febrero'), ('Marzo', 'Marzo'), ('Abril', 'Abril'), ('Mayo', 'Mayo'), ('Junio', 'Junio'), ('Julio', 'Julio'), ('Agosto', 'Agosto'), ('Septiembre', 'Septiembre'), ('Octubre', 'Octubre'), ('Noviembre', 'Noviembre'), ('Diciembre', 'Diciembre')], default='Enero', max_length=20),
        ),
        migrations.AlterField(
            model_name='monthemployee',
            name='year',
            field=models.IntegerField(default=2020),
        ),
    ]