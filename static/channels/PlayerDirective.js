(function () {
    'use strict';

    angular
        .module('channels')
        .directive('player', function ($window) {
            return function (scope, element, attr) {
                var w = angular.element($window);
                scope.$watch(function () {
                    return {
                        'h': w.height(),
                        'w': w.width()
                    };
                }, function (newValue, oldValue) {
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;
                    var w = scope.windowWidth - 382;
                    var h = scope.windowHeight - 85;
                    element.css({
                        'height': h + 'px',
                        'width': w + 'px'
                    });
                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });
            };
        })
        .directive('playerInner', function ($window) {
            return function (scope, element, attr) {
                var w = angular.element($window);
                scope.$watch(function () {
                    return {
                        'h': w.height(),
                        'w': w.width(),
                        'wide': scope.c.wideScreen
                    };
                }, function (newValue, oldValue) {
                    var toolbar = 'toolbarW' in attr;
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;
                    var w = scope.windowWidth - (document.IS_MOBILE ? 282 : 432);
                    var h = scope.windowHeight - 85;
                    if (!newValue.wide && !toolbar) {
                        w += (document.IS_MOBILE ? 260 : 400);
                        h -= 232;
                    }
                    var h2 = Math.round(w * 0.5625);
                    var w2 = Math.round(h / 0.5625);
                    if (h2 > h) {
                        w = w2;
                    }
                    if (w2 > w) {
                        h = h2;
                    }
                    if (toolbar) {
                        element.css({
                            'width': (w - 108) + 'px'
                        });
                    } else {
                        element.css({
                            'height': h + 'px',
                            'width': w + 'px'
                        });
                    }
                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });
            };
        });
})();
