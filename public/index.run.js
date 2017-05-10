angular.module('app')
  .run(run);

run.$inject = ['$rootScope', 'authService', 'lock'];

function run($rootScope, authService, lock) {
  $rootScope.authService = authService;

  authService.registerAuthenticationListener();

  lock.interceptHash();
}

