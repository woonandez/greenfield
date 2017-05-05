angular.module('app')
  .service('appServices', function($http, $q) {
    this.initMap = function() {
      console.log('hello')
    }
  });
