angular.module('app')
  .directive('search', function() {
    return {
      scope: {
        searchLocation: '<'
      },
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      controller: function($scope) {
        console.log($scope)
      },
      templateUrl: '../templates/search.html'
    }
  })