from rest_framework.routers import DefaultRouter
from .views import ProjectCreateViewSet, ProjectChipViewSet,ProjectCreateAllViewSet, ProjectTaskViewSet, ProjectBugsViewSet, ProjectFileViewSet, ProjectActivityViewSet, ProjectReportViewSet, ProjectMemberyViewSet,ProjectOwnerTaskViewSet,ProjectOwnerBugsViewSet



router = DefaultRouter()
router.register('create', ProjectCreateViewSet, basename='create')
router.register('create-all', ProjectCreateAllViewSet, basename='create-all')
router.register('project-chip', ProjectChipViewSet, basename='chips')
router.register('project-task', ProjectTaskViewSet, basename='tasks')
router.register('project-task-owner', ProjectOwnerTaskViewSet, basename='task-owner')
router.register('project-bugs', ProjectBugsViewSet, basename='bugs')
router.register('project-bugs-owner', ProjectOwnerBugsViewSet, basename='bugs-owner')
router.register('project-file', ProjectFileViewSet, basename='file')
router.register('project-activity', ProjectActivityViewSet, basename='activity')
router.register('project-report', ProjectReportViewSet, basename='report')
router.register('project-member', ProjectMemberyViewSet, basename='member')
urlpatterns = router.urls
