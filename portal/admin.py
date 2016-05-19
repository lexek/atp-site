from django.contrib import admin

from portal.forms import ChannelAdmin
from streams.models import Player, Property, Channel

admin.site.register(Property)
admin.site.register(Player)
admin.site.register(Channel, ChannelAdmin)
