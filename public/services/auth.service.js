angular.module('app')
  .service('authService', function(lock, authManager, $http) {
    this.login = () => { lock.show(); };

    this.registerAuthenticationListener = () => {
      lock.on('authenticated', (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        $http({
          'method': 'POST',
          'url': '/login',
          'headers': { 'Content-type': 'application/JSON' },
          'data': {
            'user_id': authResult.idToken
          }
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
      });

      lock.on('authorization_error', (err) => {
        console.error(err);
      });
    };

    this.logout = () => {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
      lock.show();
    };
  });