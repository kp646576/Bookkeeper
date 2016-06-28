angular.module('bookKeepingApp')
.controller('chartsCtrl', function($rootScope, $scope) {
    $rootScope.$on('switch', function(event, d) {
        //console.log("Weekly chartsCtrl");
        $scope.bData = weeklyCalc(dataSwitch(d.name), "Expenditures", "company");
        //console.log($scope.bData);
    });

    $rootScope.$on('monthly', function(event, d) {
        //console.log("Monthly chartsCtrl");
        $scope.bData = monthlyCalc(files, d.month, "Expenditures", "company");
    });


/*
    $rootScope.d3Data = {
        "Expenditures": [{
            "date:": "2016-02-01",
            "company": "Frito Lay",
            "payment": 5528,
            "amount": 166.95
        }, {
            "date": "2016-02-02",
            "company": "CK",
            "payment": 5529,
            "amount": 85.98
        }, {
            "date": "2016-02-03",
            "company": "Western Beaverage",
            "payment": 5535,
            "amount": 653.62
        }, {
            "date": "2016-02-03",
            "company": "Columbia",
            "payment": 5534,
            "amount": 85.98
        }, {
            "date": "2016-02-03",
            "company": "General",
            "payment": 5532,
            "amount": 85.98
        }, {
            "date": "2016-02-03",
            "company": "Costco",
            "payment": 5536,
            "amount": 2234.55
        }, {
            "date": "2016-02-03",
            "company": "Costco",
            "payment": "card",
            "amount": 199.98
        }, {
            "date": "2016-02-04",
            "company": "PBC",
            "payment": "5537",
            "amount": 308.10
        }]
    };
    */
    //Width and height
    $rootScope.w = 500;
    $rootScope.h = 100;
    $rootScope.barPadding = 50;

    //Create SVG element

    //$rootScope.$on('charts', function(event, d) {
    $rootScope.drawMe = function() {
            //Create SVG element
            $rootScope.svg = d3.select("#cool")
                .append("svg")
                .attr("width", $rootScope.w)
                .attr("height", $rootScope.h);
            $rootScope.scale = d3.scale.linear()
                .domain([0, 2000])
                .range([0, $rootScope.h]);
            $rootScope.svg.selectAll("rect")
                .data($rootScope.dataset2.Expenditures)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return i * ($rootScope.w / $rootScope.dataset2.Expenditures.length);
                })
                .attr("y", function(d) {
                    return $rootScope.h - scale(d.amount);
                })
                .attr("width", $rootScope.w / $rootScope.dataset2.Expenditures.length - $rootScope.barPadding)
                .attr("height", function(d) {
                    return $rootScope.scale(d.amount);
                })
                .attr("fill", "teal");
        } //);
});
