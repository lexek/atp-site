from dal import autocomplete

from streams.models import Game


class GameAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated():
            return Game.objects.none()

        qs = Game.objects.all()

        if self.q:
            qs = qs.filter(name__istartswith=self.q)

        return qs
