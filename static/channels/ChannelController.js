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
        var vm = this;

        vm.channel = {};
        vm.selectedPlayer = null;
        vm.players = [];
        vm.selectChannel = selectChannel;
        vm.chatPopup = chatPopup;
        vm.anyOnline = anyOnline;

        activate();

        function updateState() {
            channelService.fetchState().then(processState);
        }

        function processState(data) {
            var anyOnlineBefore = anyOnline();
            vm.channel = data.channel;
            vm.players = data.players;
            if (vm.selectedPlayer) {
                vm.selectedPlayer = vm.players.find(function findPlayer(e) {
                    return e.id === vm.selectedPlayer.id;
                });
            }
            if (anyOnline() && !anyOnlineBefore) {
                console.log("notify");
                //todo: notify
            }
        }

        function selectChannel(player) {
            vm.selectedPlayer = player;
        }

        function anyOnline() {
            return vm.players.some(function(channel) {
                return channel.online;
            });
        }

        function chatPopup() {
            window.open('https://atplay.ch:1337/chat.html', 'chat', 'width=400,height=600');
        }

        function activate() {
            processState(channelService.getInitialState());
            vm.selectedPlayer = vm.players[0];
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
