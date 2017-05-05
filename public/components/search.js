angular.module('app')
  .directive('search', function() {
    return {
      scope: {
        searchLocation: '<'
      },
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/search.html'
    }
  })
