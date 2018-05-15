var app = angular.module("myApp", []);
app.controller('myController', ['$scope', 'sumService', 'sumFactory', function ($scope, sumService, sumFactory) {

  $scope.doSum = function () {
    //  $scope.sum = sumService.doSumService(parseInt($scope.number1),parseInt($scope.number2));
    sumFactory.doSumFactory(parseInt($scope.number1), parseInt($scope.number2), function (result) {
      $scope.sum = result;
    });
  };
}]);

app.service('sumService', function () {
  this.doSumService = function (num1, num2) {
    return num1 + num2;
  }
});

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
