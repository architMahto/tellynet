(function() {
  'use strict';

  angular.module('loginControllers', [])
    .controller('loginController', loginController)

  loginController.$inject = ['Auth', '$location', '$rootScope', 'AuthToken', 'usersFactory', '$state', '$scope'];

  function loginController(Auth, $location, $rootScope, AuthToken, usersFactory, $state, $scope) {
    var loginCtrl = this;
    loginCtrl.error = "";
    loginCtrl.newUserData = {};
    loginCtrl.successMessage = false;
    loginCtrl.loginErrorMessage = false;
    loginCtrl.loggedIn = Auth.isLoggedIn();

    // go to browse state is user is logged in
    if (loginCtrl.loggedIn) {
      $state.go('browse')
    }

    // check if user is admin
    Auth.getUser()
      .then(function (response) {
        loginCtrl.user = response.data;
      })

    // function to allow user to join tellynet
    loginCtrl.signUp = function () {
      loginCtrl.newUserData.admin = false;
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
            loginCtrl.loggedIn = Auth.isLoggedIn();

            // grab info for logged in user
            Auth.getUser()
              .then(function (response) {
                loginCtrl.user = response.data;
              })

            $state.go('browse')
          }
          else {
            loginCtrl.error = response.data.message;
            loginCtrl.loginErrorMessage = true;
          }
        })
    }

    // function to handle logout
    loginCtrl.doLogout = function () {
      Auth.logout();
      loginCtrl.user = '';
      loginCtrl.newUserData = {};
      loginCtrl.loginData = {};
      loginCtrl.loginErrorMessage = false;
      loginCtrl.successMessage = false;
      loginCtrl.loggedIn = false;
      $state.go('home');
    }
  }
})();
