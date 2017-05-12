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

        this.currentItineraryId = +$location.path().slice(6);
        this.itineraries = [];
        this.markers = [];
        this.mapCenter = 'San Francisco';
        this.mapType = 'TERRAIN';

        this.switch = (viewport, id) => {
          if (id) {
            this.currentItineraryId = id;
            this.markers = [];
            this.start = [];
            this.end = [];
            this.getMarkerLocations();
            $location.path(viewport + '/' + id);
          } else {
            $location.path(viewport);
          }

          this.template = '/templates/' + viewport + '.html';
        }


        if ( $location.path() !== '/' ) {
          // console.log($location.path().match(/\d+/));
          if ( $location.path().match(/\d+/) ) {
            this.template = '/templates' + $location.path().slice(0, 5) + '.html';
          } else {
            console.log('In else');
            this.template = '/templates' + $location.path() + '.html';
          }
        } else {
          this.switch('itineraries');
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
          appServices.getMarkers(this.currentItineraryId, ({data}) => {
            data.forEach(d => this.markers.push(d));
            if (this.markers.length > 1) {
              this.start = this.markers[0].location;
              this.end = this.markers[this.markers.length - 1].location;
            }
          });
        }

        this.addMarker = (place, date, time, desc) => {
          var destination = place === undefined ? this.mapCenter : place;
          var reqObj = {
            id: this.currentItineraryId,
            text: destination,
            date: date,
            time: time
          }

          appServices.sendCoords(reqObj, (res) => {
            this.markers.push(res.data);
          });
        }

        // Get user itineraries for itineraries view
        appServices.getItineraries( (res) => {
          for ( var itinerary of res.data ) {
            this.itineraries.push(itinerary);
          }
        });

        // Create an itinerary for the user
        this.addItinerary = (name, start, end) => {
          var submissionData = {
            name: name,
            start: start,
            end: end
          };
          appServices.submitItinerary(submissionData, (res) => {
            this.itineraries.push(res.data);
          });
        }
      },
      templateUrl: '/templates/app.html'
    }
  });
