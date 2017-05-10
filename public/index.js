angular.module('app')
  .directive('app', function(authService) {

    if ( localStorage.getItem('id_token') ) {
      authService.authenticateOnRefresh();
    } else {
      authService.login();
    }

    return {
      scope: {},
      restrict: 'E',
      controllerAs: 'app',
      bindToController: true,
      controller: function($location, appServices, NgMap, $window) {

        this.markers = [];
        this.mapCenter = 'San Francisco';
        this.mapType = 'TERRAIN';


        // Placeholder data
        this.userItineraries = [{'id': 1, 'name': 'Europe Vacation', date: 'September 2017'},
                                {'id': 2, 'name': 'California Vacation', date: 'November 2017'},
                                {'id': 3, 'name': 'New Years!', 'date': 'January 2018'}];

        this.switch = (viewport) => {
          this.template = 'templates/' + viewport + '.html';
          $location.path(viewport);
        }

        if ( $location.url() !== '/' ) {
          this.template = 'templates/' + $location.url() + '.html';
        } else {
          this.switch('current');
        }


        this.getCurrentLocation = (e) => {
          var lat = e.latLng.lat();
          var long = e.latLng.lng();
          this.mapCenter = [lat, long];
        }

        NgMap.getMap().then( (map) => {
          console.log(this.markers, 'markers');
          map.getCenter();
          this.getMarkerLocations();
        });

        this.searchLocation = (newLoc) => {
          this.mapCenter = newLoc;
        }

        this.getMarkerLocations = () => {
          appServices.getMarkers('param', ({data}) => {
            data.forEach(d => this.markers.push(d));
          });
        }

        this.addMarker = (place, date, time, desc) => {
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
      },
      templateUrl: './templates/app.html'
    }
  });
