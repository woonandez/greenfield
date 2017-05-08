angular.module('app')
  .controller('appCtrl', function($scope, $location, appServices, NgMap, authService) {
    if ($location.url() === '/') {
      authService.login();
    }

    $scope.activate = () => {
      console.log(localStorage.getItem('id_token'));
    }

    $scope.markers = [];
    $scope.mapCenter = 'San Francisco';
    $scope.mapType = 'TERRAIN';
    $scope.locations = [{'name': 'Chicago'}, {'name': 'Los Angeles'}, {'name': 'Boston'}]; // Placeholder
    // Query database for locations
      // Create markers with longitude and latitude

    $scope.getCurrentLocation = function(e) {
      var lat = e.latLng.lat();
      var long = e.latLng.lng();
      $scope.mapCenter = [lat, long];
      console.log($scope.mapCenter, 'mapCenter')
    }

    $scope.goAnchor = function (event) {
      console.log(this.id);
      gotoAnchor(this.id);
    }

    NgMap.getMap().then(function(map) {
      map.getCenter();
      $scope.getMarkerLocations();
      console.log(map);
      // this function will be used to initialize all of the different markers on the map
        // the markers that correspond to the items in the itinerary
    });

    $scope.searchLocation = function(newLoc) {
      $scope.mapCenter = newLoc;
    }

    $scope.getMarkerLocations = function() {
      appServices.getMarkers('param', function({data}) {
        data.forEach(d => $scope.markers.push(d));
        console.log($scope.markers, 'markers');
      });
    }

  })
  // Auth0 Controller
  .controller('loginCtrl', function(authService) {
    var vm = this;
  });
