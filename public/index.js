angular.module('app')
  .controller('appCtrl', function($scope, appServices) {
  })
  .directive('appDir', function() {
    return {
      template:
      `
        <div ng-controller="loginCtrl">
          <button class="btn btn-primary" ng-click="authService.login()">Log In</button>
          <h2>hello</h2>
        </div>
      `
    }
  })

  // Auth0 Controller
  .controller('loginCtrl', function($scope, authService) {
    var vm = this;

    vm.authService = authService;
    $scope.activate = () => { console.log(this) }
  });