angular.module('app')
  .controller('appCtrl', function($scope, appServices) {
    $scope.searchLocation = function(inputVal) {
      console.log(inputVal);
    }
  })
  .directive('appDir', function() {
    return {
      template:
      `
        <h2>hello</h2>
      `
    }
  })