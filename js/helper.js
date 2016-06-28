 // Jquery selectors need to listen on after the document has been loaded
 $(document).ready(function() {
     $("#menu-toggle").click(function(e) {
         e.preventDefault();
         $("#wrapper").toggleClass("toggled");
     });
 });

 function dataSwitch(name) {
     switch (name) {
         case "w0y16":
             return w0y16;
         case "w1y16":
             return w1y16;
         case "w2y16":
             return w2y16;
         case "w3y16":
             return w3y16;
         case "w4y16":
             return w4y16;
         case "w5y16":
             return w5y16;
     }
     return null;
 }

 function weeklyCalc(file, atr, subatr) {
     var atrSum = 0;
     var atrObj = {};
     var atrAry = [];
         var atribute = file[atr];
         for (j in atribute) {
             atrSum += atribute[j].amount;
             if (atrObj[atribute[j][subatr]] == undefined) {
                 atrObj[atribute[j][subatr]] = atribute[j].amount;
             } else {
                 atrObj[atribute[j][subatr]] += atribute[j].amount;
             }
 }
 // Wrapper
 for (key in atrObj) {
     if (atrObj.hasOwnProperty(key)) {
         var tmp = {};
         tmp[subatr] = key;
         tmp["amount"] = atrObj[key].toFixed(2);
         atrAry.push(tmp);
     }
 }

 return [atrAry, atrSum.toFixed(2)];
 }

var files = [w0y16, w1y16, w2y16, w3y16, w4y16, w5y16];

function monthlyCalc(files, month, atr, subatr) {
    var atrSum = 0;
    var atrObj = {};
    var atrAry = [];
    for (i in files) {
        var atribute = files[i][atr];
        for (j in atribute) {
            if (atribute[j].date.split('-')[1].valueOf() == month) {
                atrSum += atribute[j].amount;
                if (atrObj[atribute[j][subatr]] == undefined) {
                    atrObj[atribute[j][subatr]] = atribute[j].amount;
                } else {
                    atrObj[atribute[j][subatr]] += atribute[j].amount;
                }
            } else {
                break;
            }
        }
    }

    // Wrapper
    for (key in atrObj) {
        if (atrObj.hasOwnProperty(key)) {
            var tmp = {};
            tmp[subatr] = key;
            tmp["amount"] = atrObj[key].toFixed(2);
            atrAry.push(tmp);
        }
    }

    return [atrAry, atrSum.toFixed(2)];
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}