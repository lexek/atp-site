from streams.models import Channel


def load_channels():
    data = []
    for channel in Channel.objects.all():
        players = []
        for player in channel.players.all():
            players.append({
                'provider': player.provider,
                'channel': player.channel_name
            })
        data.append({
            'name': channel.name,
            'status': channel.status,
            'game': channel.game.name if channel.game else None,
            'totalViewers': channel.total_viewers,
            'streamerName': channel.streamer.username,
            'players': players
        })
    return data
