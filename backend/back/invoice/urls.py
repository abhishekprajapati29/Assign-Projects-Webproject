from .views import AddAPI, InvoiceAPI, AddUserListAPIView, AllignDashboardAPI, ProfileAPI, InvoiceProjectJoinAPI, NotificationAPI, SubsAPI
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('api', AddAPI, basename='add'),
router.register('Subs', SubsAPI, basename='SubsAPI'),
router.register('invoice', InvoiceAPI, basename='invoice'),
router.register('addUserList', AddUserListAPIView, basename='list')
router.register('addUserListteam', ProfileAPI, basename='list_team')
router.register('list-project-invoice', InvoiceProjectJoinAPI, basename='list-project')
router.register('notification', NotificationAPI, basename='notification')
router.register('allidash', AllignDashboardAPI, basename='allign-dashboard')
urlpatterns = router.urls

