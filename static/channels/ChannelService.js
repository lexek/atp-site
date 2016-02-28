(function () {
    "use strict";

    angular.module("channels")
        .service("channelService", ["$q", "$http", ChannelService]);

    function ChannelService($q, $http) {
        var channels = PRELOADED_CHANNELS;

        return {
            loadAllChannels: function () {
                return $q.when(channels);
            }
        };
    }

})();
