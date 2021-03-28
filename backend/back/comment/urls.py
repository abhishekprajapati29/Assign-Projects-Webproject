from .views import CommentAPI, ChatAPI
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('comment', CommentAPI, basename='comment'),
router.register('chat', ChatAPI, basename='chat'),
urlpatterns = router.urls
