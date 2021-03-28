from .views import ImagesFolderViewset, ImagesListViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('images', ImagesFolderViewset, basename='image_folder'),
router.register('imagelist', ImagesListViewset, basename='image_list')
urlpatterns = router.urls
