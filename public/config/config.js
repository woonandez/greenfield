angular.module('app', ['ngMap'])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://maps.googleapis.com/maps/**'
  ]);
});
