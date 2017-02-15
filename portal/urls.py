from django.conf.urls import url

from portal import views
from portal.game_autocomplete import GameAutocomplete

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^editor$', views.editor, name='editor'),
    url(
        r'^game-autocomplete/$',
        GameAutocomplete.as_view(),
        name='game-autocomplete',
    ),
]
