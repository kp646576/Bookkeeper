define(['angularAMD', 'angularRoute'], function (angularAMD) {
  var app = angular.module("bookKepper", ['ngRoute']);
  app.config(function ($routeProvider) {
    $routeProvider.when("/tables", angularAMD.route({
      templateUrl: '../../templates/tables.html',
      controller: 'tablesCtrl',
      controllerUrl: 'js/require/controller-tables.js'
    }))
  });
  return angularAMD.bootstrap(app);
});
