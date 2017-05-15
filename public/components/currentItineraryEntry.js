angular.module('app')
  .directive('currentItineraryEntry', function() {
    return {
      scope: {
        place: '=',
        formatDate: '<',
        formatDateTime: '<',
        removeLocation: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryEntry',
      bindToController: true,
      controller: function($scope) {
        console.log($scope, 'scope');
      },
      templateUrl: '/templates/currentItineraryEntry.html'
    }
  });