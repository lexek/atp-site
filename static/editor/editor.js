(function() {
    'use strict';

    const TWITCH_CLIENT_ID = '6f7m5pnj0mp8i2il2o7o09n0dof5br';

    Twitch.init({clientId: TWITCH_CLIENT_ID}, function (error, status) {
        loginIfNeeded(status);
    });

    function loginIfNeeded(status) {
        console.log(status);
        if (!status.authenticated) {
            Twitch.login({
                scope: ['user_read', 'channel_read', 'channel_editor']
            });
        }
    }

    angular.module('editor', []);

    angular.module('editor').controller('EditorController', ['$scope', '$http', EditorController]);

    function EditorController($scope, $http) {
        $scope.input = {
            'title': 'loading',
            'game': 'loading'
        };
        $scope.ready = false;
        $scope.querySearch = querySearch;
        $scope.save = save;
        activate();

        function querySearch(query) {
            return $http({
                url: 'https://api.twitch.tv/kraken/search/games',
                params: {
                    'query': query,
                    'client_id': TWITCH_CLIENT_ID
                },
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json'
                }
            }).then(function(response) {
                var games = response.data.games;
                if (games) {
                    return games.map(function(game) {
                        return game.name;
                    });
                } else {
                    return [];
                }
            });
        }

        function save() {
            $http({
                url: 'https://api.twitch.tv/kraken/channels/38281657',
                method: 'PUT',
                params: {
                    'oauth_token': Twitch.getToken()
                },
                data: {
                    channel: {
                        status: $scope.input.title,
                        game: $scope.input.game || $scope.input.gameSearch
                    }
                },
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json'
                }
            }).success(function() {
                alert('ok');
            }).error(function() {
                alert('Не удалось обновить');
            });
        }

        function activate() {
            $http({
                url: 'https://atplay.ch/backend'
            }).success(function(data) {
                $scope.input = {
                    title: data.twitch.title,
                    game: data.twitch.game,
                    gameSearch: data.twitch.game
                };
                $scope.ready = true;
            }).error(function() {
                alert('unable to fetch data');
            });
        }
    }
})();
