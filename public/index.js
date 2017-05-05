angular.module('app')
  .controller('appCtrl', function($scope, appServices, NgMap) {
    $scope.mapCenter = 'San Francisco';

    $scope.goAnchor = function (event) {
 console.log(this.id);
 gotoAnchor(this.id);
};

    NgMap.getMap().then(function(map) {
      map.getCenter();
      console.log(map);
      console.log('markers', map.markers);
      // var user = {
      //   cityLoc: $scope.mapCenter,
      //   date: '',
      //   time: '',
      //   uid: ''
      // }
    });

    $scope.searchLocation = function(newLoc) {
      $scope.mapCenter = newLoc;
    }

  })