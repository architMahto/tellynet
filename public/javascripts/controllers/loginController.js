(function() {
  'use strict';

  angular.module('loginControllers', [])
    .controller('loginController', loginController)

  loginController.$inject = ['Auth', '$location', '$rootScope', 'AuthToken', 'usersFactory'];

  function loginController(Auth, $location, $rootScope, AuthToken, usersFactory) {
    var loginCtrl = this;
    loginCtrl.error = "";
    loginCtrl.newUserData = {};
    loginCtrl.successMessage = false;

    $rootScope.$on('$stateChangeSuccess', function () {

      loginCtrl.loggedIn = Auth.isLoggedIn();

      Auth.getUser()
        .then(function (response) {
          loginCtrl.user = response.data;
        })
    });

    Auth.getUser()
      .then(function (response) {
        loginCtrl.user = response.data;
        $location.path('/browse');
      })

    // function to allow user to join tellynet
    loginCtrl.signUp = function () {
      usersFactory.create(loginCtrl.newUserData)
        .then(function(response) {
          loginCtrl.successMessage = !loginCtrl.successMessage;
        })
    }

    // function to handle login
    loginCtrl.doLogin = function () {

      Auth.login(loginCtrl.loginData.email, loginCtrl.loginData.password)
        .then(function (response) {
          AuthToken.setToken(response.data.token);
          if (response.data.success) {
            $location.path('/browse');
          }
          else {
            loginCtrl.error = response.data.message;
            console.log(loginCtrl.error);
          }
        })
    }

    // function to handle logout
    loginCtrl.doLogout = function () {
      Auth.logout();
      loginCtrl.user = '';
      loginCtrl.newUserData = {};
      loginCtrl.successMessage = false;
      $location.path('/')
    }
  }
})();
