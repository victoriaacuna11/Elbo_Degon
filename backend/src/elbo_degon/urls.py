
# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api-auth/', include('rest_framework.urls')),

# ]

from django.contrib import admin
from django.urls import path, include
from api.views import get_data, data_2


urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest/', include('api.urls')),
    path('rest/x', get_data),
    path('rest/l', data_2),
]
