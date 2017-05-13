angular.module('app')
  .directive('currentItineraryList', function() {
    return {
      scope: {
        locations: '<',
        addMarker: '<',
        mapCenter: '<',
        formatDate: '<',
        formatDateTime: '<',
        removeLocation: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryList',
      bindToController: true,
      controller: function() {},
      templateUrl: '/templates/currentItineraryList.html'
    }
  });