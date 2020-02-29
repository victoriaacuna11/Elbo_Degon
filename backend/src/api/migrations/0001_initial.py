# Generated by Django 3.0.2 on 2020-02-29 16:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_delivery', models.BooleanField()),
                ('date_time', models.DateTimeField()),
                ('subtotal', models.FloatField()),
                ('availible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('availible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ci', models.CharField(max_length=60)),
                ('name', models.CharField(max_length=60)),
                ('last_name', models.CharField(max_length=60)),
                ('is_meber', models.BooleanField()),
                ('availible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='CurrencyExchange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bs_exchange', models.FloatField()),
                ('euro_exchange', models.FloatField()),
                ('date', models.DateField(default='2020-02-12')),
                ('availible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ci', models.CharField(max_length=60)),
                ('name', models.CharField(max_length=60)),
                ('last_name', models.CharField(max_length=60)),
                ('phone', models.CharField(max_length=20)),
                ('points', models.IntegerField()),
                ('adress', models.CharField(max_length=200)),
                ('gender', models.CharField(choices=[('Hombre', 'Hombre'), ('Mujer', 'Mujer'), ('Otro', 'Otro')], max_length=60)),
                ('birth_date', models.DateField()),
                ('job_id', models.CharField(choices=[('Gerente', 'Gerente'), ('Repartidor', 'Repartidor'), ('Cajero', 'Cajero')], max_length=60)),
                ('email', models.EmailField(default='', max_length=254)),
                ('date_hired', models.DateField(default='1999-03-12')),
                ('availible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Local',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=200)),
                ('opening_time', models.TimeField()),
                ('closing_time', models.TimeField()),
                ('availible', models.BooleanField(default=True)),
                ('manager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Employee')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_method', models.CharField(choices=[('Efectivo', 'Efectivo'), ('Online', 'Online')], max_length=60)),
                ('currency', models.CharField(choices=[('Dolares', 'Dolares'), ('Bolivares', 'Bolivares'), ('Euros', 'Euros')], max_length=60)),
                ('total', models.FloatField()),
                ('account_n', models.BigIntegerField()),
                ('availible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=60)),
                ('hall', models.IntegerField()),
                ('availible', models.BooleanField(default=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('main_phone', models.BigIntegerField()),
                ('phone', models.BigIntegerField()),
                ('address', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('availible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('cost', models.FloatField()),
                ('availible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductBatch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expiration_date', models.DateField(default='2020-02-12')),
                ('elaboration_date', models.DateField(default='2020-02-12')),
                ('actual_quantity', models.BigIntegerField()),
                ('quantity_sold', models.BigIntegerField(default=0)),
                ('cost', models.FloatField()),
                ('discount', models.IntegerField()),
                ('price', models.FloatField()),
                ('point_cost', models.IntegerField()),
                ('availible', models.BooleanField(default=True)),
                ('local', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Local')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Provider'),
        ),
        migrations.CreateModel(
            name='PickUp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pick_up_time', models.TimeField()),
                ('delivered', models.BooleanField()),
                ('availible', models.BooleanField(default=True)),
                ('bill_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Bill')),
                ('local', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Local')),
            ],
        ),
        migrations.CreateModel(
            name='Payment_Bill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('availible', models.BooleanField(default=True)),
                ('bill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Bill')),
                ('payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Payment')),
            ],
        ),
        migrations.CreateModel(
            name='MonthEmployee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.CharField(max_length=20)),
                ('year', models.IntegerField()),
                ('availible', models.BooleanField(default=True)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Employee')),
            ],
        ),
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points', models.IntegerField()),
                ('phone', models.BigIntegerField()),
                ('gender', models.CharField(choices=[('Hombre', 'Hombre'), ('Mujer', 'Mujer'), ('Otro', 'Otro')], max_length=60)),
                ('address', models.CharField(max_length=200)),
                ('birth_date', models.DateField()),
                ('email', models.EmailField(max_length=254)),
                ('date_registered', models.DateField()),
                ('password', models.CharField(max_length=20, null=True)),
                ('availible', models.BooleanField(default=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Client')),
            ],
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=200)),
                ('min_time', models.TimeField()),
                ('delivered', models.BooleanField()),
                ('availible', models.BooleanField(default=True)),
                ('bill_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Bill')),
                ('delivery_boy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Employee')),
                ('zone', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Zone')),
            ],
        ),
        migrations.AddField(
            model_name='client',
            name='zone',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Zone'),
        ),
        migrations.CreateModel(
            name='BillProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('discount', models.FloatField()),
                ('availible', models.BooleanField(default=True)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ProductBatch')),
                ('bill_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Bill')),
            ],
        ),
        migrations.AddField(
            model_name='bill',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Client'),
        ),
    ]