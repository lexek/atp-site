import requests
from django.conf import settings


def get_games(offset):
    params = {
        'api_key': settings.GAMEBOMB_TOKEN,
        'format': 'json',
        'field_list': 'name,aliases,id',
        'sort': 'id',
        'limit': 100,
        'offset': offset
    }
    headers = {'User-agent': 'ATP bot'}
    r = requests.get('http://www.giantbomb.com/api/games/', headers=headers, params=params)
    if r.status_code == requests.codes.ok:
        return r.json()
    print r.text
    return None
