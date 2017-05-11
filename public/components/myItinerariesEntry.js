angular.module('app')
  .directive('myItinerariesEntry', function() {
    return {
      scope: {
        itinerary: '<'
      },
      restrict: 'E',
      controllerAs: 'myItinerariesEntry',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/myItinerariesEntry.html'
    }
  });