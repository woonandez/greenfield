angular.module('app')
  .controller('appCtrl', function($scope, $location, appServices, NgMap, authService, $window) {

    if ( localStorage.getItem('id_token') ) {
      authService.authenticateOnRefresh();
    }

    if (!localStorage.getItem('id_token') ) {
      authService.login();
    }
    $scope.markers = [];
    $scope.mapCenter = 'San Francisco';
    $scope.mapType = 'TERRAIN';

    $scope.activate = () => {
      console.log(localStorage.getItem('id_token'));
    }

    // Placeholder data
    $scope.userItineraries = [{'id': 1, 'name': 'Europe Vacation', date: 'September 2017'},
                              {'id': 2, 'name': 'California Vacation', date: 'November 2017'},
                              {'id': 3, 'name': 'New Years!', 'date': 'January 2018'}];

    $scope.changeCurrentItinerary = (desiredItinerary) => {
      $scope.locations = [];
      // Loop through all locations in desired itinerary and add to locations list
    }

    $scope.viewport = 'currentItinerary';
    $scope.switch = (viewport) => {
      $scope.viewport = viewport;
      if ($scope.viewport === 'currentItinerary') {
        console.log('Back');
      } else {
        $scope.template = '/templates/myItinerariesList.html'
        console.log('New');
      }
    }


    $scope.getCurrentLocation = (e) => {
      var lat = e.latLng.lat();
      var long = e.latLng.lng();
      $scope.mapCenter = [lat, long];
    }

    NgMap.getMap().then((map) => {
      console.log($scope.markers, 'markers');
      map.getCenter();
      $scope.getMarkerLocations();
    });

    $scope.searchLocation = (newLoc) => {
      $scope.mapCenter = newLoc;
    }

    $scope.getMarkerLocations = () => {
      appServices.getMarkers('param', ({data}) => {
        data[0].locations.forEach(d => $scope.markers.push(d));
      });
    }

    $scope.addMarker = (place, date, time, desc) => {
      console.log('ran');
      var reqObj = {
        text: place,
        date: date,
        time: time,
        desc: desc
      }
      appServices.sendCoords(reqObj, (res) => {
        console.log(res, 'response obj');
        $window.location.reload();
      });
    }

  })
  // Auth0 Controller
  .controller('loginCtrl', (authService) => {
    var vm = this;
  });
