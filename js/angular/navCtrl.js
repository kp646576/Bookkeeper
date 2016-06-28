angular.module('bookKeepingApp').controller('navCtrl', function($rootScope, $scope) {
    $scope.number = 5;
    $scope.months = ['Jan', 'Feb'];
    $scope.getNumber = function(num) {
        return new Array(num);
    }

    $scope.drawMe = function() {
        //console.log('hello from navCtrl'); 
        $rootScope.$emit('charts', {
            "name": "w" + this.$index + "y16"
        });
    }

    $scope.printMe = function() {
        //console.log(this.$index);
        $rootScope.$emit('switch', {
            "name": "w" + this.$index + "y16"
        });

        $rootScope.$emit('title', {
            "name": "WW" + this.$index
        });
    }

    $scope.monthlyCal = function() {
        //console.log(this.i);
        $rootScope.$emit('monthly', {
            "month": this.$index + 1
        });

        $rootScope.$emit('title', {
            "name": this.i
        });
    };
});
