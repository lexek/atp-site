import django
import time

django.setup()

from streams import giantbomb
from streams.models import Game, Property


def sync():
    last_offset, _ = Property.objects.get_or_create(key='giantbomb.sync.last_offset', defaults={'value': str(0)})
    offset = int(last_offset.value) if last_offset else 0
    total = None
    current_games = [i for i in Game.objects.all()]
    ids = set([i.giantbomb_id for i in current_games])
    names = set([unicode(i.name.lower().strip()) for i in current_games])
    print names
    try:
        while (not total) or (offset < total):
            offset += 100
            games = giantbomb.get_games(offset)
            if not total:
                total = games['number_of_total_results']
            print games
            new_games = [Game(name=i['name'].strip(), giantbomb_id=i['id']) for i in games['results']]
            new_games = {i.name.lower().strip(): i for i in new_games if unicode(i.name.lower()) not in names}.values()
            new_games = {i.giantbomb_id: i for i in new_games if i.giantbomb_id not in ids}.values()
            Game.objects.bulk_create(new_games)
            ids |= set([i.giantbomb_id for i in new_games])
            names |= set([unicode(i.name.lower()) for i in new_games])
            time.sleep(1)
            print offset
    finally:
        Property.objects.update_or_create(key='giantbomb.sync.last_offset', defaults={'value': str(offset - 200)})

sync()
