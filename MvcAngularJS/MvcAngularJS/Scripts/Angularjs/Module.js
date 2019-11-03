var app = angular.module('empApp', []).directive();


//Custom FILTERS
app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


//CUSTOM DIRECTIVES
// On esc event
app.directive('onEsc', function () {
    return function (scope, elm, attr) {
        elm.bind('keydown', function (e) {
            if (e.keyCode === 27) {
                scope.$apply(attr.onEsc);
            }
        });
    };
});

// On enter event
app.directive('onEnter', function () {
    return function (scope, elm, attr) {
        elm.bind('keypress', function (e) {
            if (e.keyCode === 13) {
                scope.$apply(attr.onEnter);
            }
        });
    };
});
