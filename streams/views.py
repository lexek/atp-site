import json

from django.http import HttpResponse

from streams.services import load_channels


def get_channels(request):
    return HttpResponse(json.dumps(load_channels()), content_type='application/json')
