require(["controllers/module", "bytepushers"], function(controllers) {
  controllers.controller('view2Controller', function ($scope) {
      $scope.isArray = Object.isDate(new Date());
      $scope.isNotArray = Object.isDate("str");
  });
});
