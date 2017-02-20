(function () {
    'use strict';

    angular
        .module('channels')
        .controller('ChannelController', [
            'channelService', '$interval', 'ngAudio',
            ChannelController
        ])
        .controller('PlayerController', [
            '$element', '$scope',
            PlayerController
        ])
        .run(['$mdDialog', initRules]);

    function ChannelController(channelService, $interval, ngAudio) {
        var vm = this;
        var alerts = {
            0: ngAudio.load('/static/assets/sound/toasty.mp3'),
            1: ngAudio.load('/static/assets/sound/call.mp3'),
            2: ngAudio.load('/static/assets/sound/alert.mp3'),
            3: ngAudio.load('/static/assets/sound/secret.mp3'),
            4: ngAudio.load('/static/assets/sound/gta.mp3')
        };

        vm.channel = {};
        vm.selectedPlayer = null;
        vm.players = [];
        vm.selectChannel = selectChannel;
        vm.chatPopup = chatPopup;
        vm.anyOnline = anyOnline;
        vm.subscribe = subscribe;
        vm.saveBg = saveBg;
        vm.getIconColor = getIconColor;
        vm.subscribed = false;
        vm.mobile = document.IS_MOBILE;
        vm.bg = '#34447f';
        vm.tempBg = null;
        vm.wideScreen = true;

        activate();

        function getIconColor() {
            if (vm.selectedPlayer.online) {
                return '#259b24';
            } else {
                if (vm.anyOnline()) {
                    return '#cddc39';
                } else {
                    return 'grey';
                }
            }
        }

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
            if (data.update && anyOnline() && !anyOnlineBefore) {
                notify();
            }
        }

        function notify() {
            var type = 0;
            var rand = Math.round(Math.random() * 1000);
            if (rand >= 990) {
                type = 3;
            } else if (rand >= 950) {
                type = 0;
            } else if (rand >= 840 && rand <= 890) {
                type = 1;
            } else if (rand >= 340 && rand <= 490) {
                type = 4;
            } else {
                type = 2;
            }

            var alert = alerts[type];
            alert.volume = 0.5;
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

        function saveBg() {
            if (localStorage && vm.tempBg) {
                localStorage.setItem('ATP_COLOR', vm.tempBg);
                vm.bg = vm.tempBg;
            }
        }

        function activate() {
            processState(channelService.getInitialState());
            vm.selectedPlayer = vm.players[0];
            updateState();
            $interval(updateState, 5000);

            if (OneSignal) {
                OneSignal.push(function () {
                    OneSignal.on('subscriptionChange', function (isSubscribed) {
                        vm.subscribed = isSubscribed;
                    });
                });

                OneSignal.isPushNotificationsEnabled().then(function (isSubscribed) {
                    vm.subscribed = isSubscribed;
                });
            }

            if (localStorage || localStorage.getItem('ATP_COLOR')) {
                vm.bg = localStorage.getItem('ATP_COLOR');
            }

            vm.tempBg = vm.bg;
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
        self.h = element.width() + 'px';
        self.w = element.height() + 'px';

        scope.$watchCollection('genStyle()', function () {
            self.w = element.width() + 'px';
            self.h = element.height() + 'px';
        });

        angular.element(window).bind('resize', function() {
            self.w = element.width();
            self.h = element.height();
            scope.$apply();
        });

        var w = $(window);
        function genStyle() {
            return {
                'width': w.width(),
                'height': w.height()
            };
        }
    }

    function DialogController($scope, $mdDialog) {
        $scope.accept = function() {
            localStorage.setItem('ATP_RULES', 'OK');
            $mdDialog.hide();
        };
    }

    function initRules($mdDialog) {
        if (!localStorage || localStorage.getItem('ATP_RULES') !== 'OK') {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/static/channels/view/rules.html',
                parent: angular.element(document.body),
                escapeToClose: false
            });
        }
    }
})();
