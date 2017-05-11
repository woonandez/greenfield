angular.module('app')
  .service('appServices', function($http) {
    this.sendCoords = function(object, callback) {
      $http({
        method: 'POST',
        url: '/submit_location',
        headers: { 'Content-Type': 'application/json'},
        data: {
          itineraryId: object.id,
          text: object.text,
          time: object.time,
          date: object.date
        }
      }).then((res) => {
        callback(res);
      })
    }

    this.getMarkers = function(id, callback) {
      $http({
        method: 'GET',
        url: '/locations_for_itinerary',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        params: {
          itineraryId: id
        }
      }).then((res) => {
        callback(res);
      })
    }

    this.getLocation = function(object, callback) {
      $http({
        method: 'POST',
        url: '/location_by_coords',
        headers: { 'Content-Type': 'application/json'},
        data: {
          latitude: object.latitude,
          longitude: object.longitude
        }
      }).then((res) => {
        callback(res);
      });
    }

    this.getItineraries = function(callback) {
      var id = localStorage.getItem('id_token');
      $http({
        method: 'GET',
        url: '/itineraries_for_user',
        headers: { 'Content-Type': 'application/json' },
        params: {
          user_id: id
        }
      }).then((res) => {
        callback(res);
      });
    }

    this.submitItinerary = function({name, start, end}, callback) {
      var id = localStorage.getItem('id_token');
      $http({
        method: 'POST',
        url: '/submit_itinerary',
        headers: { 'Content-Type': 'application/json' },
        data: {
          user_id: id,
          name: name,
          start: start,
          end: end,
        }
      }).then((res) => {
        callback(res);
      });
    }
  });
