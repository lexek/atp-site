(function () {
    "use strict";

    angular.module("channels")
        .service("channelService", ["$q", "$http", ChannelService]);

    function ChannelService($q, $http) {
        var firstFetch = true;

        return {
            fetchState: function() {
                return $http({
                    method: "GET",
                    url: "http://atplay.ch:7777/new"
                }).then(function(response) {
                    if (response.status === 200) {
                        var data = response.data;
                        var status = data.channel.status;
                        if (status.endsWith("@Play") && (status.indexOf("|") !== -1)) {
                            var temp = status.substring(0, status.length - 5).split("|");
                            data.channel.status = temp[0].trim();
                            data.channel.streamer = temp[1].trim();
                        }
                        data.update = !firstFetch;
                        firstFetch = false;
                        return data;
                    } else {
                        $q.reject(response);
                    }
                })
            },
            getInitialState: function () {
                return {
                    update: false,
                    channel: {
                        status: "ATPlay",
                        game: null,
                        streamer: null,
                        viewers: 0
                    },
                    players: [
                        {
                            id: 0,
                            online: false,
                            channel: "atplay",
                            provider: "cybergame",
                            viewers: 0
                        },
                        {
                            id: 1,
                            online: false,
                            channel: "atpchannel",
                            provider: "twitch",
                            viewers: 0
                        },
                        {
                            id: 2,
                            online: false,
                            channel: "38465",
                            provider: "goodgame",
                            viewers: 0
                        },
                        {
                            id: 3,
                            online: false,
                            channel: "16970245",
                            provider: "ustream",
                            viewers: 0
                        }
                    ]
                };
            }
        };
    }

})();
