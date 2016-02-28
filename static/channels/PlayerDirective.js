(function () {
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
                        "height": h + "px",
                        "width": w + "px"
                    });
                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });
            }
        })
        .directive('playerInner', function ($window) {
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
                    var h2 = Math.round(w * 0.596);
                    var w2 = Math.round(h / 0.596);
                    if (h2 > h) {
                        w = w2;
                    }
                    element.css({
                        "height": h + "px",
                        "width": w + "px"
                    });
                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });
            }
        });

})();

//w 382
//h 80