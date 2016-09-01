from __future__ import unicode_literals

from django.conf import settings
from django.db import models


AUTH_USER_MODEL = getattr(settings, 'AUTH_USER_MODEL', 'auth.User')


class Game(models.Model):
    name = models.CharField(max_length=255, unique=True)
    giantbomb_id = models.IntegerField(null=True, unique=True)
    gg_id = models.IntegerField(null=True)

    def __unicode__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=16)
    status = models.CharField(max_length=64)
    total_viewers = models.IntegerField(null=True)
    streamer = models.ForeignKey(AUTH_USER_MODEL)
    game = models.OneToOneField(Game, null=True, blank=True)
    order = models.IntegerField()

    def __unicode__(self):
        return self.name + ': ' + self.status

    class Meta:
        ordering = ['order']


class Player(models.Model):
    SUPPORTED_PLAYERS = (
        ('twitch', 'twitch.tv'),
        ('cybergame', 'cybergame.tv'),
        ('goodgame', 'goodgame.ru'),
        ('ustream', 'ustream.tv'),
    )

    provider = models.CharField(choices=SUPPORTED_PLAYERS, max_length=32)
    channel_name = models.CharField(max_length=64)
    channel = models.ForeignKey(Channel, related_name="players", unique=False)
    order = models.IntegerField()
    online = models.BooleanField()

    def __unicode__(self):
        return self.provider + ': ' + self.channel_name

    class Meta:
        index_together = (
            ('provider', 'channel'),
        )
        ordering = ['order']


class Property(models.Model):
    key = models.CharField(max_length=64, primary_key=True)
    value = models.TextField()
