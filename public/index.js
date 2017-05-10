angular.module('app')
  .directive('app', function(authService) {
    if ( localStorage.getItem('id_token') ) {
      authService.authenticateOnRefresh();
    }

    if ( !localStorage.getItem('id_token') ) {
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

        this.changeCurrentItinerary = (desiredItinerary) => {
          this.locations = [];
          // Loop through all locations in desired itinerary and add to locations list
        }

        this.viewport = 'currentItinerary';
        this.switch = (viewport) => {
          this.viewport = viewport;
          if (this.viewport === 'currentItinerary') {
            console.log('Back');
          } else {
            // this.templateUrl = '/templates/myItinerariesList.html'
            console.log('New');
          }
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
