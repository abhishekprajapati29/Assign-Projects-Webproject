from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import ProjectCreate, ProjectCreateChip,ProjectTask, ProjectBugs, ProjectFile,ProjectReport, ProjectActivity, ProjectMember
from django.contrib.auth.models import User

class ProjectMemberSerialzier(ModelSerializer):
    class Meta:
        model = ProjectMember
        fields = '__all__' 

class ProjectCreateChipSerialzier(ModelSerializer):
    class Meta:
        model = ProjectCreateChip
        fields = '__all__'

class ProjectBugsSerialzier(ModelSerializer):
    class Meta:
        model = ProjectBugs
        fields = '__all__'      

class ProjectFileSerialzier(ModelSerializer):
    class Meta:
        model = ProjectFile
        fields = '__all__'    

class ProjectActivitySerialzier(ModelSerializer):
    class Meta:
        model = ProjectActivity
        fields = '__all__'    

class ProjectReportSerialzier(ModelSerializer):
    class Meta:
        model = ProjectReport
        fields = '__all__'    

class ProjectTaskSerialzier(ModelSerializer):
    class Meta:
        model = ProjectTask
        fields = '__all__'      


class ProjectCreateSerializer(ModelSerializer):
    promem = ProjectMemberSerialzier(many=True, required=False)
    promem_count = SerializerMethodField()
    prochip = ProjectCreateChipSerialzier(many=True, required=False)
    task = ProjectTaskSerialzier(many=True, required=False)
    total_task_count = SerializerMethodField()
    success_task_count = SerializerMethodField()
    success_task_count = SerializerMethodField()
    bugs = ProjectBugsSerialzier(many=True, required=False)
    total_bugs_count = SerializerMethodField()
    success_bugs_count = SerializerMethodField()
    success_bugs_count = SerializerMethodField()
    file = ProjectFileSerialzier(many=True, required=False)
    file_count = SerializerMethodField()
    activity = ProjectActivitySerialzier(many=True, required=False)
    activity_count = SerializerMethodField()
    report = ProjectReportSerialzier(many=True, required=False)
    report_count = SerializerMethodField()
    success_report_count = SerializerMethodField()
    user_id = SerializerMethodField(read_only=True)
    username = SerializerMethodField(read_only=True)
    class Meta:
        model = ProjectCreate
        fields = ('id', 
                    'user_id',
                    'username',
                    "project_name",
                    "main_application",
                    "start_date",
                    "end_date",
                    "project_description",
                    "preferenece",
                    "Status",
                    "promem_count",
                    "total_task_count",
                    "success_task_count",
                    "total_bugs_count",
                    "success_bugs_count",
                    "file_count",
                    "activity_count",
                    "report_count", 
                    "success_report_count",
                    "prochip", 
                    "task", 
                    "bugs",
                    "file",
                    "report",
                    "activity",
                    "promem",)


    def get_user_id(self, obj):
        return str(obj.user.id)

    def get_username(self, obj):
        return str(obj.user.username)

    def get_total_task_count(self, obj):
        return obj.task.count()

    def get_total_bugs_count(self, obj):
        return obj.bugs.count()

    def get_success_task_count(self, obj):
        return obj.task.filter(status='Success').count()

    def get_success_bugs_count(self, obj):
        return obj.bugs.filter(status='Success').count()

    def get_success_report_count(self, obj):
        return obj.report.filter(status ='Success').count()
    
    def get_report_count(self, obj):
        return obj.report.count()

    def get_file_count(self, obj):
        return obj.file.count()

    def get_promem_count(self, obj):
        return obj.promem.count()

    def get_activity_count(self, obj):
        return obj.activity.count()



