from .views import NoteViewset, NoteChipViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('note', NoteViewset, basename='note_user')
router.register('notechip', NoteChipViewSet, basename='note_chip')
urlpatterns = router.urls
