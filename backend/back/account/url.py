from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserProfileAPI, ImageChangeAPI, UserListProfileAPI, UserAPIUpdate, UserImageAPI,MessageAPIView, ProfileAccessAPI
from knox import views as knox_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('userprofile', UserProfileAPI, basename='user_profile')
router.register('userprofileList', UserListProfileAPI,
                basename='user_profile_list')
router.register('userprofileUpdate', UserAPIUpdate,
                basename='user_profile_update')
router.register('userprofile_image', ImageChangeAPI, basename='image')
router.register('user_allow', ProfileAccessAPI, basename = "allow" ),
router.register('user_message', MessageAPIView, basename='user-message')
router.register('user_image', UserImageAPI, basename='User_image')
urlpatterns = router.urls
