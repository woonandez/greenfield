angular.module('app')
  .controller('appCtrl', function($scope, appServices, NgMap, authService) {
    authService.login();
    $scope.mapCenter = 'San Francisco';

    NgMap.getMap().then(function(map) {

      map.getCenter();
      console.log(map);
      console.log('markers', map.markers);
      var user = {
        cityLoc: $scope.mapCenter,
        markers: map.markers,
        time: '',
        date: '',
        uid: ''
      }
      appServices.sendCoords(user, function(res) {
        console.log(res);
      })

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
      `
    }
  })

  // Auth0 Controller
  .controller('loginCtrl', function(authService) {
    var vm = this;
  });