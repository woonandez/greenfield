angular.module('app')
  .directive('currentItineraryList', function() {
    return {
      scope: {
        locations: '<',
        addMarker: '<',
        mapCenter: '<'
      },
      restrict: 'E',
      controllerAs: 'currentItineraryList',
      bindToController: true,
      controller: function() {
        console.log(this);
      },
      link: function() {
        console.log(this, 'link');
      }
      templateUrl: '../templates/currentItineraryList.html'
    }
  });