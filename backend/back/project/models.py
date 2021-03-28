from django.db import models
from django.contrib.auth.models import User
import datetime
from django.utils import timezone

# Create your models here.

class ProjectCreate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=50)
    main_application = models.CharField(max_length=200)
    start_date = models.DateField(default=datetime.date.today)
    end_date = models.DateField(default=datetime.date.today)
    project_description = models.TextField(max_length=20000)
    preferenece = models.CharField(max_length=100)
    Status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return self.project_name


class ProjectMember(models.Model):
    project_id = models.ForeignKey(ProjectCreate, related_name="promem", on_delete= models.CASCADE)
    member = models.CharField(max_length=100)
    timestamp = models.DateField(default=datetime.date.today)




class ProjectCreateChip(models.Model):
    ProjectCreatechip = models.ForeignKey(ProjectCreate, related_name="prochip", on_delete= models.CASCADE)
    chips = models.CharField(max_length=30)



class ProjectTask(models.Model):
    project_id = models.ForeignKey(ProjectCreate, related_name='task', on_delete=models.CASCADE)
    tasks = models.TextField(max_length=1000)
    status = models.CharField(max_length=50, default='Pending')
    requested_by = models.CharField(max_length=50)
    requested_to = models.CharField(max_length=50)
    due_date=models.DateField(default=datetime.date.today)
    timestamp = models.DateField(default=datetime.date.today)


class ProjectBugs(models.Model):
    project_id = models.ForeignKey(ProjectCreate, related_name='bugs', on_delete=models.CASCADE)
    bugs = models.TextField(max_length=1000)
    status = models.CharField(max_length=50, default='Pending')
    requested_by = models.CharField(max_length=50)
    requested_to = models.CharField(max_length=50)
    due_date=models.DateField(default=datetime.date.today)
    timestamp = models.DateField(default=datetime.date.today)


class ProjectReport(models.Model):
    project_id = models.ForeignKey(ProjectCreate, related_name='report', on_delete=models.CASCADE)
    report = models.TextField(max_length=1000)
    posted_by = models.CharField(max_length=50)
    comment = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default='Pending')
    timestamp = models.DateField(default=datetime.date.today)


class ProjectActivity(models.Model):
    project_id = models.ForeignKey(ProjectCreate, related_name='activity', on_delete=models.CASCADE)
    activity = models.TextField(max_length=1000)
    image_type = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    timestamp = models.DateTimeField(default=timezone.now)


class ProjectFile(models.Model):
    project_id = models.ForeignKey(ProjectCreate, related_name='file', on_delete=models.CASCADE)
    files = models.FileField(
        upload_to="project_file")
    uploaded_by = models.CharField(max_length=50, default='abhis')
    title = models.CharField(max_length=500, blank=True, null=True)
    type = models.CharField(max_length=50, default="")
    size = models.IntegerField(default=0)
    timestamp = models.DateField(default=datetime.date.today)

