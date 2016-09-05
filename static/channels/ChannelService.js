(function () {
    "use strict";

    angular.module("channels")
        .service("channelService", ["$q", "$http", ChannelService]);

    function ChannelService($q, $http) {
        return {
            fetchState: function() {
                return $http({
                    method: "GET",
                    url: "http://atplay.ch:7777/new"
                }).then(function(response) {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        $q.reject(response);
                    }
                })
            },
            getInitialState: function () {
                return {
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
