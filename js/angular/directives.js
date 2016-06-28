var app = angular.module('bookKeepingApp');

app.directive('bkDropdown', function() {
    return {
        restrict: 'A',
        template: "<li class='dropdown'>
    <a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Select Representation<span class='caret'></span></a>
    <ul class='dropdown-menu'>
        <li><a href='#/tables'>Tables</a></li>
        <li><a href='#/graphs'>Graphs</a></li>
    </ul>
</li>"






        "<div ng-repeat='item in items' ng-click='updateRating(item)' ng-class='getRatingClass(item.ratings)'>{{item.ratings}}</div>",
        scope: {
            items: '=items'
        },
        link: function(scope, element, attrs) {
            scope.updateRating = function(item){
                alert('inside update rating');
                item.ratings = item.ratings+1;
            };
        
            scope.getRatingClass = function(rating){
                if(rating > 10){
                    return 'important';
                }            
                return 'normal';
            };
       }
    };
});