angular.module('app')
  .controller('appCtrl', function($scope, appServices) {
  })
  .directive('appDir', function() {
    return {
      template:
      `
        <h2>hello</h2>
      `
    }
  })