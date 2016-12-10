(function () {
    angular
        .module('channels')
        .controller('ChannelController', [
            'channelService', '$interval', 'ngAudio',
            ChannelController
        ])
        .controller("PlayerController", [
            "$element", "$scope",
            PlayerController
        ]);

    function ChannelController(channelService, $interval, ngAudio) {
        var vm = this;
        var alerts = {
            0: ngAudio.load("/static/assets/sound/toasty.mp3"),
            1: ngAudio.load("/static/assets/sound/call.mp3"),
            2: ngAudio.load("/static/assets/sound/alert.mp3"),
            3: ngAudio.load("/static/assets/sound/secret.mp3")
        };

        vm.channel = {};
        vm.selectedPlayer = null;
        vm.players = [];
        vm.selectChannel = selectChannel;
        vm.chatPopup = chatPopup;
        vm.anyOnline = anyOnline;
        vm.subscribe = subscribe;
        vm.subscribed = false;

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
                notify();
            }
        }

        function notify() {
            var type = 0;
            var rand = Math.round(Math.random() * 1000);
            if (rand >= 990) {
                type = 3
            } else if (rand >= 950 ){
                type = 0;
            } else if (rand >= 840 && rand <= 890){
                type = 1;
            } else {
                type = 2;
            }

            var alert = alerts[type];
            console.log(alert);
            alert.volume = .5;
            alert.currentTime = 0;
            alert.play();
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

            OneSignal.push(function() {
                OneSignal.on('subscriptionChange', function (isSubscribed) {
                    vm.subscribed = isSubscribed;
                });
            });

            OneSignal.isPushNotificationsEnabled().then(function(isSubscribed) {
                vm.subscribed = isSubscribed;
            });
        }

        function subscribe() {
            OneSignal.push(function() {
                OneSignal.registerForPushNotifications({
                    modalPrompt: true
                });
            });
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
