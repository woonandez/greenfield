angular.module('app')
  .directive('navBar', function() {
    return {
      scope: {},
      restrict: 'E',
      controllerAs: 'nav',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/navBar.html'
    }
  });