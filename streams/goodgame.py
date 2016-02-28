import requests


def get_games(page):
    params = {
        "page": page
    }
    r = requests.get('http://api2.goodgame.ru/games', params=params)
    if r.status_code == requests.codes.ok:
        return r.json()
    print r.text
    return None


get_games(0)
