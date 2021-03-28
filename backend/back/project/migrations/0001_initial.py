# Generated by Django 3.0.2 on 2020-03-14 17:47

import datetime
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
            name='ProjectCreate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=50)),
                ('main_application', models.CharField(max_length=200)),
                ('start_date', models.DateField(default=datetime.date.today)),
                ('end_date', models.DateField(default=datetime.date.today)),
                ('project_description', models.TextField(max_length=20000)),
                ('preferenece', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectTask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tasks', models.TextField(max_length=1000)),
                ('requested_by', models.CharField(max_length=50)),
                ('requested_to', models.CharField(max_length=50)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task', to='project.ProjectCreate')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectCreateChip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chips', models.CharField(max_length=30)),
                ('ProjectCreatechip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prochip', to='project.ProjectCreate')),
            ],
        ),
    ]