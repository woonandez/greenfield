angular.module('app')
  .directive('currentItineraryList', function() {
    return {
      scope: {
        locations: '<',
        addMarker: '<',
        mapCenter: '<',
        formatDate: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryList',
      bindToController: true,
      controller: function($scope) {
        console.log($scope);
      },
      templateUrl: '../templates/currentItineraryList.html'
    }
  });