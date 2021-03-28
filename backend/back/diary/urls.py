from .views import diaryViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('diary', diaryViewset, basename='user')
urlpatterns = router.urls
