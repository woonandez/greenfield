angular.module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'ngMap'])
  .config(function($sceDelegateProvider, lockProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://maps.googleapis.com/maps/**'
    ]);

    lockProvider.init({
      clientID: 'x7Iti71JJV6appY7ppOL6Xaji1hH4FmB',
      domain: 'xosk.auth0.com',
      options: {
        _idTokenVerification: false
      }
    });



  });
