(function() {
  'use strict';

  angular.module('loginControllers', [])
    .controller('loginController', loginController)

  loginController.$inject = ['Auth', '$location', '$rootScope', 'AuthToken'];

  function loginController(Auth, $location, $rootScope, AuthToken) {
    var loginCtrl = this;

    $rootScope.$on('$stateChangeSuccess', function () {
      console.log("State Change");

      loginCtrl.loggedIn = Auth.isLoggedIn();

      Auth.getUser()
        .then(function (response) {
          lCtrl.user = response.data;
          console.log("api/me route", response);
        })
    });

    loginCtrl.doLogin = function () {
      console.log("Do Login");
      console.log(loginCtrl.loginData);

      Auth.login(loginCtrl.loginData.email, loginCtrl.loginData.password)
        .then(function (response) {
          AuthToken.setToken(response.data.token);
          console.log("Response from server", response);
          $location.path
        })
    }

    loginCtrl.doLogout = function () {
      Auth.logout();
      loginCtrl.user = '';
      $location.path('/')
    }
  }
})();
