angular.module('app')
  .directive('currentItineraryList', function() {
    return {
      scope: {
        locations: '<',
        addMarker: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryList',
      bindToController: true,
      controller: function() {
        console.log(this);
      },
      templateUrl: '../templates/currentItineraryList.html'
    }
  });