# Generated by Django 2.2.5 on 2020-01-22 15:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=50, null=True)),
                ('file', models.FileField(upload_to='File')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='file', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]