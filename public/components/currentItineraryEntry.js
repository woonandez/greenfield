angular.module('app')
  .directive('currentItineraryEntry', function() {
    return {
      scope: {
        place: '=',
        formatDate: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryEntry',
      bindToController: true,
      controller: function($scope) {
        console.log($scope);
      },
      templateUrl: '../templates/currentItineraryEntry.html'
    }
  });