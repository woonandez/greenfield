angular.module('app')
  .controller('appCtrl', function($scope, $location, appServices, NgMap, authService) {
    if ($location.url() === '/') {
      authService.login();
    }
    $scope.markers = [];
    $scope.mapCenter = 'San Francisco';
    $scope.mapType = 'TERRAIN';
    $scope.locations = [{'name': 'Chicago'}, {'name': 'Los Angeles'}, {'name': 'Boston'}];

    $scope.activate = () => {
      console.log(localStorage.getItem('id_token'));
    }

    // Placeholder
    // Query database for locations
      // Create markers with longitude and latitude

    $scope.getCurrentLocation = (e) => {
      var lat = e.latLng.lat();
      var long = e.latLng.lng();
      $scope.mapCenter = [lat, long];
      console.log($scope.mapCenter, 'mapCenter')
    }

    $scope.goAnchor = (event) => {
      console.log(this.id);
      gotoAnchor(this.id);
    }

    NgMap.getMap().then((map) => {
      map.getCenter();
      $scope.getMarkerLocations();
      console.log(map);
      // this function will be used to initialize all of the different markers on the map
        // the markers that correspond to the items in the itinerary
    });

    $scope.searchLocation = (newLoc) => {
      $scope.mapCenter = newLoc;
    }

    $scope.getMarkerLocations = () => {
      appServices.getMarkers('param', ({data}) => {
        data.forEach(d => $scope.markers.push(d));
        console.log($scope.markers, 'markers');
      });
    }

    $scope.addMarker = () => {
      console.log('ran');
    }

  })
  // Auth0 Controller
  .controller('loginCtrl', (authService) => {
    var vm = this;
  });
