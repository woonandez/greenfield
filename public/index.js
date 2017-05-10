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


        // console.log($location.url());
        // console.log($location.path());
        if ( $location.url() !== '/' ) {
          this.template = '/templates' + $location.path() + '.html';
        } else {
          // this.template = '/templates/current.html';
          // $location.path(current);
          this.switch('current');
        }

        // console.log($location.path());
        // console.log(this.template);



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
