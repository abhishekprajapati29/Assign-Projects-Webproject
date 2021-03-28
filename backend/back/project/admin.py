from django.contrib import admin

# Register your models here.
from .models import ProjectCreate, ProjectCreateChip, ProjectTask

admin.site.register(ProjectCreate)
admin.site.register(ProjectTask)
admin.site.register(ProjectCreateChip)