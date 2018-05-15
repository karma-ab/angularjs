var app = angular.module("myApp", []);
app.controller('myController', ['$scope', 'sumService', 'sumFactory','$http', function ($scope, sumService, sumFactory,$http) {

  $scope.doSum = function () {
    sumService.fetchMayors("showMayors",function(resp){
      $scope.mayors = resp;
     });
    sumFactory.doSumFactory(parseInt($scope.number1), parseInt($scope.number2), function (result) {
      $scope.sum = result;
    });
  };
}]);

app.service('sumService', ['$http','$log',function ($http,$log) {
  var urlDev = "http://localhost:8484/spring-boot-dev/";
  var urlProd = "http://localhost:8585/spring-boot-prod/";

  this.doSumService = function (num1, num2) {
    return num1 + num2;
  };

  this.fetchMayors = function(endpoint,cb){
    $http({
      'url':urlDev+endpoint,
      'method':'GET'
    }).then(function(resp){
      cb(resp.data);
    },function(resp){
      
    });
  };
}]);

//Normal Sync Method
/* app.factory('sumFactory', ['$log', function ($log) {
  $log.log("instatiating factory...");
  var sumFactoryObj = {};
  sumFactoryObj.doSumFactory = function (num1, num2) {
    return num1 + num2;
  };
  return sumFactoryObj;
}; */
  //Async way Introducing callback function
  app.factory('sumFactory', ['$log', function ($log) {
    $log.log("instatiating factory...");
    var sumFactoryObj = {};
    sumFactoryObj.doSumFactory = function (num1, num2, callbackFactory) {
      callbackFactory(num1 + num2);
    };
    return sumFactoryObj;

  }]);
