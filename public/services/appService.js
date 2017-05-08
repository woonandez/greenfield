angular.module('app')
  .service('appServices', function($http) {
    this.sendCoords = function(object, callback) {
      $http({
        method: 'POST',
        url: '/submit_location',
        headers: { 'Content-Type': 'application/json'},
        data: {
          cityLoc: object.cityLoc,
          time: object.time,
          date: object.date
        }
      }).then((res) => {
        callback(res);
      })
    }

    this.getMarkers = function(param, callback) {
      $http({
        method: 'GET',
        url: '/locations_for_itinerary',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then((data) => {
        callback(data);
      })
    }
  });