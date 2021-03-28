from .views import todoViewset,TodoChipViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('todo', todoViewset, basename='user')
router.register('todochip', TodoChipViewSet, basename='chip')
urlpatterns = router.urls
