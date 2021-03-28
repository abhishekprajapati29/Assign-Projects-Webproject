from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('rest_framework.urls')),
    path('reset/', include('django_rest_passwordreset.urls')),
    path('', include('account.urls')),
    path('', include('account.url')),
    path('', include('todo.urls')),
    path('', include('imageblock.urls')),
    path('', include('diary.urls')),
    path('', include('invoice.urls')),
    path('', include('comment.urls')),
    path('', include('pdfs.urls')),
    path('', include('videos.urls')),
    path('', include('post.urls')),
    path('', include('notes.urls')),
    path('', include('project.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
