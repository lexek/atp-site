from dal import autocomplete
from django import forms
from django.contrib import admin

from streams.models import Channel


class ChannelForm(forms.ModelForm):
    class Meta:
        model = Channel
        fields = '__all__'
        widgets = {
            'game': autocomplete.ModelSelect2(url='game-autocomplete')
        }


class ChannelAdmin(admin.ModelAdmin):
    form = ChannelForm
