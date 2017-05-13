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
        this.mapType = 'ROADMAP';

        if ( !this.mapCenter ) {
          this.mapCenter = 'San Francisco';
        }

        this.switch = (viewport, id) => {
          if (id) {
            this.currentItineraryId = id;
            this.currentItinerary = this.itineraries.find((itinerary) => { return itinerary.id === id })
            this.markers = [];
            this.start = [];
            this.end = [];
            this.getMarkerLocations();
            $location.path(viewport + '/' + id);
          } else {
            this.currentItinerary = {name: 'My Itineraries'};
            $location.path(viewport);
          }

          this.template = '/templates/' + viewport + '.html';
        }


        if ( $location.path() !== '/' ) {
          authService.checkAuthorization(this.currentItineraryId, (isAuthorized) => {
            if (isAuthorized === 'true') {
              if ( $location.path().match(/\d+/) ) {
                this.template = '/templates' + $location.path().slice(0, 5) + '.html';
              } else {
                this.template = '/templates' + $location.path() + '.html';
              }
            } else {
              this.switch('itineraries');
            }
          });
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
          this.getMarkerLocations(map);
        });

        this.searchLocation = (newLoc) => {
          this.mapCenter = newLoc;
        }

        this.getMarkerLocations = (map) => {
          appServices.getMarkers(this.currentItineraryId, ({data}) => {
            this.markers = [];
            data.forEach(d => this.markers.push(d));
            if (this.markers.length) {
              this.mapCenter = this.markers[0].location;
            }

            if (this.markers.length > 1) {
              this.start = this.markers[0].location;
              this.end = this.markers[this.markers.length - 1].location;
            }

            if ( this.currentItineraryId !== 0 ) {
              this.currentItinerary = this.itineraries.find((itinerary) => { return itinerary.id === this.currentItineraryId });
            } else {
              this.currentItinerary = {name: 'My Itineraries'};
            }

            // map.getCenter();
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
            if (this.markers.length > 1) {
              this.start = this.markers[0].location;
              this.end = this.markers[this.markers.length - 1].location;
            }
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


        this.formatDate = (date) => {
          var length = date.length;
          var format = date.split('').splice(0, 10).join('');
          return format.replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{7})$/, '$3/$2/$1');
        }

        this.formatDateTime = (timeDate) => {
          console.log(timeDate);
        }

        // Remove itinerary from user account
        this.removeItinerary = (itineraryId) => {
          appServices.deleteItinerary(itineraryId, (res) => {});

          var itineraryToRemove = this.itineraries.findIndex((itinerary) => {
            return itinerary['id'] === itineraryId;
          });

          this.itineraries.splice(itineraryToRemove, 1);
        }

        // Remove location from selected itinerary
        this.removeLocation = (locationId) => {
          appServices.deleteLocation(locationId, this.currentItineraryId, (res) => {});

          var locationToRemove = this.markers.findIndex((location) => {
            return location['id'] === locationId;
          });

          this.markers.splice(locationToRemove, 1);

        }
      },
      templateUrl: '/templates/app.html'
    }
  });
