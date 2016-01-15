'use strict';

// This does not work.
// Tried many variations of the name for the module,
// including passing the complete path down to the 'main' file for the package.
// var BytePushers = require('bytepushers-common-js');

// This works. Afterwards, BytePushers is defined.
System.import('bytepushers-common-js');

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);