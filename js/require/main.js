require.config({
  baseUrl: 'js',
  paths: {
    jquery: 'lib/jquery-1.11.3.min',
    domReady: 'lib/domReady',
    angular: 'lib/angular.min',
    angularRoute: 'lib/angular-route',
    angularAMD: 'lib/angularAMD.min',
    bookKeeping: 'angular/bookKeeping',
    //tablesCtrl: 'angular/tablesCtrl',
    w0y16: 'data/w0y16',
    w1y16: 'data/w1y16',
    w2y16: 'data/w2y16',
    w3y16: 'data/w3y16',
    w4y16: 'data/w4y16',
    w5y16: 'data/w5y16',
    w6y16: 'data/w6y16',
    w7y16: 'data/w7y16'
  },
  shim: {
    'angularAMD': ['angular'], 
    'angularRoute': ['angular']
    /*'angular': {
      exports: 'angular'
    }*/
  },
  deps: ['require/app']
});

//require(['bookKeeping'], function (bk) {});
