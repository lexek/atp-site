from django.conf.urls import url

from streams import views

urlpatterns = [
    url(r'get_channels', views.get_channels),
]
