angular.module('app')
  .directive('currentItineraryEntry', function() {
    return {
      scope: {
        place: '=',
        addMarker: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryEntry',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/currentItineraryEntry.html'
    }
  });