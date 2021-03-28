from rest_framework.routers import DefaultRouter
from .views import VideoViewset
router = DefaultRouter()
router.register('video', VideoViewset, basename='video')
urlpatterns = router.urls
