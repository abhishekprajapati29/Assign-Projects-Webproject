# Generated by Django 3.0.2 on 2020-06-11 10:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0013_auto_20200611_1530'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2020, 6, 11, 15, 39, 33, 244488)),
        ),
    ]