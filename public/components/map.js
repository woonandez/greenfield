angular.module('app')
  .controller('mapCtrl', function() {})
  .directive('map', function() {
    return {
      scope: {
        params: '<'
      },
      restrict: 'E',
      controllerAs: 'ctrl',
      controller: 'mapCtrl',
      bindToController: true,
      controller: function() {
        console.log(this);
      },
      templateUrl: '../templates/map.html'
    }
  });