(function () {

    angular
        .module('channels')
        .controller('ChannelController', [
            'channelService', '$log', '$q',
            ChannelController
        ])
        .controller("PlayerController", [
            "$element", "$scope",
            PlayerController
        ]);

    function ChannelController(channelService) {
        var self = this;

        self.selectedChannel = null;
        self.selectedPlayer = null;
        self.channels = [];
        self.selectChannel = selectChannel;

        channelService
            .loadAllChannels()
            .then(function (channels) {
                self.channels = [].concat(channels);
                self.selectedChannel = channels[0];
                self.selectedPlayer = self.selectedChannel.players[0];
                console.log(self);
            });

        function selectChannel(channel, player) {
            self.selectedChannel = channel;
            self.selectedPlayer = player;
        }
    }

    function PlayerController(element, scope) {
        var self = this;
        self.h = element.width() + "px";
        self.w = element.height() + "px";

        scope.$watchCollection("genStyle()", function (newValue, oldValue) {
            self.w = element.width() + "px";
            self.h = element.height() + "px";
            console.log(newValue)
        });

        angular.element(window).bind("resize", function() {
            self.w = element.width();
            self.h = element.height();
            scope.$apply();
        });

        var w = $(window);
        function genStyle() {
            return {
                "width": w.width(),
                "height": w.height()
            }
        }
    }
})();
