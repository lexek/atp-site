import json

from django.shortcuts import render
from django.template import Context

from streams.services import load_channels


def index(request):
    c = Context({
        'user': request.user,
        'preloaded_channels': json.dumps(load_channels())
    })
    return render(request, "index.html", context=c)


def editor(request):
    return render(request, "editor.html")
