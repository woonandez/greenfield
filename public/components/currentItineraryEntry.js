angular.module('app')
  .directive('currentItineraryEntry', function() {
    return {
      scope: {
        place: '=',
        formatDate: '<',
        formateDateTime: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryEntry',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/currentItineraryEntry.html'
    }
  });