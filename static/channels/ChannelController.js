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

        self.selectedPlayer = null;
        self.channels = [];
        self.flatChannels = [];
        self.selectChannel = selectChannel;
        self.chatPopup = chatPopup;

        channelService
            .loadAllChannels()
            .then(function (channels) {
                self.channels = [].concat(channels);
                self.flatChannels = [];
                $.each(self.channels, function(_, channel) {
                    $.each(channel.players, function(_, player) {
                        player.ch = channel;
                        self.flatChannels.push(player);
                    });
                });
                self.selectedPlayer = self.flatChannels[0];
                console.log(self);
            });

        function selectChannel(player) {
            self.selectedPlayer = player;
        }

        function chatPopup() {
            window.open('https://atplay.ch:1337/chat.html', 'chat', 'width=300,height=400');
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
