(function () {

    angular
        .module('channels')
        .controller('ChannelController', [
            'channelService', '$interval',
            ChannelController
        ])
        .controller("PlayerController", [
            "$element", "$scope",
            PlayerController
        ]);

    function ChannelController(channelService, $interval) {
        var self = this;

        self.channel = {};
        self.selectedPlayer = null;
        self.players = [];
        self.selectChannel = selectChannel;
        self.chatPopup = chatPopup;
        self.anyOnline = anyOnline;

        activate();

        function updateState() {
            channelService.fetchState().then(processState);
        }

        function processState(data) {
            var anyOnlineBefore = anyOnline();
            self.channel = data.channel;
            self.players = data.players;
            if (self.selectedPlayer) {
                self.selectedPlayer = self.players.find(function findPlayer(e) {
                    return e.id === self.selectedPlayer.id;
                });
            }
            if (anyOnline() && !anyOnlineBefore) {
                console.log("notify");
                //todo: notify
            }
        }

        function selectChannel(player) {
            self.selectedPlayer = player;
        }

        function anyOnline() {
            return self.players.some(function(channel) {
                return channel.online;
            });
        }

        function chatPopup() {
            window.open('https://atplay.ch:1337/chat.html', 'chat', 'width=400,height=600');
        }

        function activate() {
            processState(channelService.getInitialState());
            self.selectedPlayer = self.players[0];
            updateState();
            $interval(updateState, 5000);
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
