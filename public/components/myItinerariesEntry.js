angular.module('app')
  .directive('myItinerariesEntry', function() {
    return {
      scope: {
        itinerary: '<',
        appClick: '<',
        formatDate: '<',
        formatDateTime: '<',
        removeItinerary: '<'
      },
      restrict: 'E',
      controllerAs: 'myItinerariesEntry',
      bindToController: true,
      controller: function() {
        console.log(this);
      },
      templateUrl: '/templates/myItinerariesEntry.html'
    }
  });