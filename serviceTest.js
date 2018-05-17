
app.controller('myController', ['$scope', 'sumService', 'sumFactory', '$http', function ($scope, sumService, sumFactory, $http) {

  $scope.user1 = {
    "name":"Abhijit",
    "surname":"Vishwakarma"
  };

  $scope.doSum = function () {
    sumService.fetchMayors("showMayors")
      .then(function (resp) {
        console.log("inside scope call");
        console.log(resp)
        $scope.mayors = resp.data;

      })

    sumFactory.doSumFactory(parseInt($scope.number1), parseInt($scope.number2), function (result) {
      $scope.sum = result;
    });
  };
}]);
