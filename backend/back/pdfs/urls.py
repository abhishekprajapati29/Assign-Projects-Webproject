from rest_framework.routers import DefaultRouter
from .views import FileViewset

router = DefaultRouter()
router.register('file', FileViewset, basename='file')
urlpatterns = router.urls
