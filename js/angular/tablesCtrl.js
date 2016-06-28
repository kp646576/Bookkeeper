angular.module('bookKeepingApp').controller('tablesCtrl', function($rootScope, $scope) {
    var companies = {};

    function sum(items) {
        var sum = 0.0;
        for (var i in items) {
            sum += items[i].amount;
        }
        return sum.toFixed(2);
    }

    $scope.getTotal = function() {
        var res = 0.0;
        for (var i = 0; i < arguments.length; i++) {
            res += parseFloat(arguments[i]);
        }
        return res.toFixed(2);
    }

    // ------------------------------
    // Weekly Data
    // ------------------------------
    $rootScope.$on('switch', function(event, d) {
        
        var bData = dataSwitch(d.name);
        var wSalesTotal = 0;
        $rootScope.expenditures = bData.Expenditures;
        $rootScope.totalExpenditures = sum(bData.Expenditures);
        $rootScope.utilities = bData.Utilities;
        $rootScope.other = bData.Other;
        $rootScope.totalUtilities = sum(bData.Utilities);
        $rootScope.totalOExpenses = sum(bData.Other);
        $rootScope.sales = bData.Sales;
        $rootScope.totalExpenses = (parseFloat($rootScope.totalUtilities) + parseFloat($rootScope.totalOExpenses)).toFixed(2);

        for (i in bData.Sales) {
            //console.log(bData.Sales[i].sales);
            wSalesTotal += bData.Sales[i].sales;
        }
        $rootScope.totalSales = wSalesTotal.toFixed(2);
        $rootScope.totalProfit = ($rootScope.totalSales - $rootScope.totalExpenditures).toFixed(2);
        $rootScope.totalProfitPercentage = ($rootScope.totalProfit / $rootScope.totalSales * 100).toFixed(2);
    });

    function monthlySalesCalc(files, month) {
        var atrSum = 0;
        var atrObj = {
            "lottery": 0,
            "sales": 0,
            "adjustedSales": 0,
            "creditCard": 0,
            "foodStamps": 0,
            "atm": 0
        };
        var atrAry = [];
        for (i in files) {
            var atribute = files[i]["Sales"];
            for (j in atribute) {
                if (atribute[j].date.split('-')[1].valueOf() == month) {
                    atrObj["lottery"] += atribute[j]["lottery"];
                    atrObj["sales"] += atribute[j]["sales"];
                    atrObj["adjustedSales"] += atribute[j]["adjustedSales"];
                    atrObj["creditCard"] += atribute[j]["creditCard"];
                    atrObj["foodStamps"] += atribute[j]["foodStamps"];
                    atrObj["atm"] += atribute[j]["atm"];
                } else {
                    break;
                }
            }
        }

        atrObj["lottery"] = atrObj["lottery"].toFixed(2);
        atrObj["sales"] = atrObj["sales"].toFixed(2);
        atrObj["adjustedSales"] = atrObj["adjustedSales"].toFixed(2);
        atrObj["creditCard"] = atrObj["creditCard"].toFixed(2);
        atrObj["foodStamps"] = atrObj["foodStamps"].toFixed(2);
        atrObj["atm"] = atrObj["atm"].toFixed(2);
        //console.log(atrObj);
        atrAry.push(atrObj);
        return atrAry;
    }




    // ------------------------------
    // Monthly Data
    // ------------------------------
    $rootScope.$on('monthly', function(event, d) {
        //console.log(d.month);
        

        var expenditures = monthlyCalc(files, d.month, "Expenditures", "company");
        var utilities = monthlyCalc(files, d.month, "Utilities", "company");
        var other = monthlyCalc(files, d.month, "Other", "type");
        var wSalesTotal = 0;
        $rootScope.expenditures = expenditures[0];
        $rootScope.utilities = utilities[0];
        $rootScope.other = other[0];
        $rootScope.totalExpenditures = expenditures[1];
        $rootScope.totalUtilities = utilities[1];
        $rootScope.totalOExpenses = other[1];
        $rootScope.totalUtilities = utilities[1];
        $rootScope.totalExpenses = (parseFloat(utilities[1]) + parseFloat(other[1])).toFixed(2);
        $rootScope.sales = monthlySalesCalc(files, d.month);

        $rootScope.totalSales = $rootScope.sales[0].sales;
        $rootScope.totalProfit = ($rootScope.totalSales - $rootScope.totalExpenditures).toFixed(2);
        $rootScope.totalProfitPercentage = ($rootScope.totalProfit / $rootScope.totalSales * 100).toFixed(2);
    });
});
