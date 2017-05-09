angular.module('app')
  .directive('myItinerariesEntry', function() {
    return {
      scope: {
        itinerary: '<'
        changeCurrentItinerary: '<'
      },
      restrict: 'E',
      controllerAs: 'myItinerariesEntry',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/myItinerariesEntry.html'
    }
  });