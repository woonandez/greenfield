angular.module('app')
  .directive('myItinerariesList', function() {
    return {
      scope: {
        userItineraries: '<',
        changeCurrentItinerary: '<'
      },
      restrict: 'E',
      controllerAs: 'myItinerariesList',
      bindToController: true,
      controller: function() {},
      templateUrl: '../templates/myItinerariesList.html'
    }
  });