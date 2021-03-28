from rest_framework.routers import DefaultRouter
from .views import PostViewset, PostCommentViewset, PostAllUserViewset

router = DefaultRouter()
router.register('post', PostViewset, basename='post')
router.register('postALL', PostAllUserViewset, basename='post')
router.register('postcomment', PostCommentViewset, basename='post_comment')
urlpatterns = router.urls
