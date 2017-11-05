var app = angular.module('app', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
            templateUrl: 'home.html'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerCtrl'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

// app.controller('registerCtrl', function() {
//     var regUser = function() {
//         console.log("testing new button");
//     }
// });