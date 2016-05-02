from django.conf.urls import url

from portal import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
