angular.module('app')
  .directive('currentItineraryEntry', function() {
    return {
      scope: {
        place: '='
      },
      restrict: 'E',
      controllerAs: 'currentItineraryEntry',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/currentItineraryEntry.html'
    }
  });