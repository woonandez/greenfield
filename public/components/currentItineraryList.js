angular.module('app')
  .directive('currentItineraryList', function() {
    return {
      scope: {
        locations: '<',
        addMarker: '<',
        mapCenter: '<',
        formatDate: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryList',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/currentItineraryList.html'
    }
  });