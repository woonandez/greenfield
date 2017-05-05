angular.module('app')
  .controller('appCtrl', function($scope) {
    $scope.params = 'hello';
    console.log($scope, 'SCOPE')
  })
  .directive('appDir', function() {
    return {
      template:
      `
        <h2>hello</h2>
      `
    }
  })