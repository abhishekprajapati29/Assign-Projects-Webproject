# Generated by Django 2.2.5 on 2019-09-15 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0004_auto_20190915_1709'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diary',
            name='time',
            field=models.DateTimeField(default='2019-09-15 17:14'),
        ),
    ]