angular.module('app')
  .service('authService', function(lock, authManager, $http, $window) {
    this.login = () => { lock.show(); };

    this.registerAuthenticationListener = () => {
      lock.on('authenticated', (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        $http({
          'method': 'POST',
          'url': '/login',
          'headers': { 'Content-type': 'application/json' },
          'data': {
            'user_id': authResult.idToken
          }
        })
        .then((res) => {
          // console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
      });

      lock.on('authorization_error', (err) => {
        console.error(err);
      });
    };

    this.authenticateOnRefresh = () => {
      authManager.authenticate();
    };

    this.checkAuthorization = (itineraryId, callback) => {
      var id = localStorage.getItem('id_token');
      $http({
        'method': 'GET',
        'url': '/authorize_itinerary',
        'headers': { 'Content-type': 'application/json' },
        'params': {
          user_id: id,
          itineraryId: itineraryId
        }
      }).then((res) => {
        callback(res.data);
      }).catch((err) => {
        console.error(err);
      });
    }

    this.logout = () => {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
      $window.location.href = '/itineraries';
      lock.show();
    };
  });