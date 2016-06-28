angular.module('bookKeepingApp', ['ngRoute'])
    // Need to set up local server for this to work
    .config(function($routeProvider) {
        $routeProvider
            .when('/tables', {
                templateUrl: '../../templates/tables.html',
                controller: 'tablesCtrl'
            })
            .when('/charts', {
                templateUrl: '../../templates/charts.html',
                controller: 'chartsCtrl'
            })
            .otherwise({
                redirectTo: '/tables'
            });
    });
