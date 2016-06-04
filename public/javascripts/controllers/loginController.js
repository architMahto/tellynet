(function() {
  'use strict';

  angular.module('loginControllers', [])
    .controller('loginController', loginController)

  loginController.$inject = ['Auth', '$location', '$rootScope', 'AuthToken', 'usersFactory', '$state'];

  function loginController(Auth, $location, $rootScope, AuthToken, usersFactory, $state) {
    var loginCtrl = this;
    loginCtrl.error = "";
    loginCtrl.newUserData = {};
    loginCtrl.successMessage = false;
    loginCtrl.loginErrorMessage = false;
    loginCtrl.loggedIn = Auth.isLoggedIn();

    if (loginCtrl.loggedIn) {
      $state.go('browse')
    }

    // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //   loginCtrl.loggedIn = Auth.isLoggedIn();
    // });
    //
    // $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //
    //   Auth.getUser()
    //     .then(function (response) {
    //       loginCtrl.user = response.data;
    //       console.log(loginCtrl.user);
    //
    //       $location.path('/browse');
    //     })
    // });

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
            // $location.path('/browse');
            loginCtrl.loggedIn = Auth.isLoggedIn();
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
      // $location.path('/')
      $state.go('home');
    }
  }
})();
