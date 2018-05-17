
app.controller('myController', ['$scope', 'sumService', 'sumFactory','$http', function ($scope, sumService, sumFactory,$http) {

  $scope.doSum = function () {
    sumService.fetchMayors("showMayors")
    .then(function(resp){
      console.log("inside scope call");
      console.log(resp)
      $scope.mayors = resp.data;
      
    })
     
    sumFactory.doSumFactory(parseInt($scope.number1), parseInt($scope.number2), function (result) {
      $scope.sum = result;
    });
  };
}]);

app.service('sumService', ['$http','$log','$q',function ($http,$log,$q) {
  var urlDev = "http://localhost:8484/spring-boot-dev/";
  var urlProd = "http://localhost:8585/spring-boot-prod/";

  var deferred = $q.defer();
  this.doSumService = function (num1, num2) {
    return num1 + num2;
  };

  this.fetchMayors = function(endpoint){
    console.log("inside service call");
    
    $http({
      'url':urlDev+endpoint,
      'method':'GET'
    }).then(function(resp){
      deferred.resolve(resp);
      //cb(resp.data);
    },function(resp){
      deferred.reject(resp);
    });

    return deferred.promise;
    
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

