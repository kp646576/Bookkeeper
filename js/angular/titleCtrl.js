angular.module('bookKeepingApp').controller('titleCtrl', function($rootScope, $scope) {
    $scope.title;
    $rootScope.$on('title', function(event, d) {
        $scope.title = d.name;
    });
});
