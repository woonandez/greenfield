angular.module('app')
  .controller('appCtrl', function($scope, appServices, NgMap) {
    $scope.mapCenter = 'San Francisco';
    NgMap.getMap().then(function(map) {
      console.log(map);
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
    $scope.searchLocation = function(newLoc) {
      $scope.mapCenter = newLoc;
    }
    $scope.searchPlaces = function(input) {
    }
  })
  .directive('appDir', function() {
    return {
      template:
      `
        <h2>hello</h2>
      `
    }
  })