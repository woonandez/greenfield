angular.module('app', ['auth0.lock', 'angular-jwt', 'angular-storage', 'ui.router', 'ngMap'])
  .config(function($sceDelegateProvider, $stateProvider, lockProvider, $urlRouterProvider, $httpProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://maps.googleapis.com/maps/**'
    ]);

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'appCtrl',
        templateUrl: '../index.html',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        templateUrl: '../templates/login.html',
        controllerAs: 'vm'
      })

    lockProvider.init({
      clientID: 'x7Iti71JJV6appY7ppOL6Xaji1hH4FmB',
      domain: 'xosk.auth0.com',
      options: {
        _idTokenVerification: false
      }
    });

    $urlRouterProvider.otherwise('/login');
  });
