# Generated by Django 2.2.3 on 2019-08-02 07:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0012_auto_20190802_0714'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='username',
            new_name='user_name',
        ),
    ]