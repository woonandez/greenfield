angular.module('app')
  .directive('currentItineraryEntry', function() {
    return {
      scope: {
        place: '='
      },
      restrict: 'E',
      controllerAs: 'currentItineraryEntry',
      bindToController: true,
      controller: () => {},
      templateUrl: '../templates/currentItineraryEntry.html'
    }
  });