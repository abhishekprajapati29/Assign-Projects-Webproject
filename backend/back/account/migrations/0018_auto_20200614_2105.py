# Generated by Django 2.2.13 on 2020-06-14 15:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0017_auto_20200614_1916'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2020, 6, 14, 21, 5, 17, 325590)),
        ),
    ]