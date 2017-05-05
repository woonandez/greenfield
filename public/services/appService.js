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
  });
