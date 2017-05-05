angular.module('app')
  .controller('mapCtrl', function(appServices, $scope, $http) {
  })
  .directive('maps', function() {
    return {
      scope: {
        params: '<'
      },
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/map.html'
    }
  });