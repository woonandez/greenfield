angular.module('app')
  .directive('app', function() {


    return {
      scope: {
        authenticated: '<',
        service: '<'
      },
      restrict: 'E',
      controllerAs: 'app',
      bindToController: true,
      controller: function($location, appServices, NgMap, $window, authService) {
        if ( localStorage.getItem('id_token') ) {
          authService.authenticateOnRefresh();
        } else {
          authService.login();
        }

        this.markers = [];
        this.mapCenter = 'San Francisco';
        this.mapType = 'TERRAIN';

        // Placeholder data
        this.userItineraries = [{'id': 1, 'name': 'Europe Vacation', date: 'September 2017'},
                                {'id': 2, 'name': 'California Vacation', date: 'November 2017'},
                                {'id': 3, 'name': 'New Years!', 'date': 'January 2018'}];

        this.switch = (viewport) => {
          this.template = '/templates/' + viewport + '.html';
          $location.path(viewport);
        }

        if ( $location.url() !== '/' ) {
          this.template = '/templates' + $location.path() + '.html';
        } else {
          this.switch('current');
        }

        this.getCurrentLocation = (e) => {
          var lat = e.latLng.lat();
          var long = e.latLng.lng();
          var latLong = {
            latitude: lat,
            longitude: long,
          }
          appServices.getLocation(latLong, (res) => {
            this.mapCenter = res.data;
          });
        }

        NgMap.getMap().then((map) => {
          this.map = map;
          map.getCenter();
          this.getMarkerLocations();
        });

        this.searchLocation = (newLoc) => {
          this.mapCenter = newLoc;
        }

        this.getMarkerLocations = () => {
          appServices.getMarkers('param', ({data}) => {
            data.forEach(d => this.markers.push(d));
            console.log(this.markers);
          });
        }

        this.addMarker = (place, date, time, desc) => {
          var destination = place === undefined ? this.mapCenter : place;
          var reqObj = {
            text: destination,
            date: date,
            time: time,
            desc: desc
          }
          appServices.sendCoords(reqObj, (res) => {
            $window.location.reload();
          });
        }
      },
      templateUrl: './templates/app.html'
    }
  });
