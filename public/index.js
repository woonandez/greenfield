angular.module('app')
  .controller('appCtrl', function($scope, appServices, NgMap) {
    $scope.mapCenter = 'San Francisco';
    $scope.mapType = 'TERRAIN';

    $scope.changeMapType = function() {
      $scope.mapType === 'TERRAIN' ? $scope.mapType = 'SATELLITE' : $scope.mapType = 'TERRAIN';
    };

    $scope.getCurrentLocation = function(e) {
      var lat = e.latLng.lat();
      var long = e.latLng.lng();
      $scope.mapCenter = [lat, long];
      console.log('lat', lat, 'long', long);
    }

//     $scope.getCurrentLocation = function(event){
//         console.log(event.latLng.lat());
//         console.log(event.latLng.lng());
// }

    $scope.goAnchor = function (event) {
      console.log(this.id);
      gotoAnchor(this.id);
    };

    NgMap.getMap().then(function(map) {
      map.getCenter();
      console.log(map);
      // console.log('markers', map.markers);
      // var user = {
      //   cityLoc: $scope.mapCenter,
      //   date: '',
      //   time: '',
      //   uid: ''
      // }
    });

    $scope.searchLocation = function(newLoc) {
      $scope.mapCenter = newLoc;
    }

  })