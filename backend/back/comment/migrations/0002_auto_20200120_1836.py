# Generated by Django 2.2.5 on 2020-01-20 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='comments',
            new_name='message',
        ),
    ]