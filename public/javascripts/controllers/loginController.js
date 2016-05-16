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
    loginCtrl.loginErrorMessage = false;

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      loginCtrl.loggedIn = Auth.isLoggedIn();
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      // console.log(toState);
      // console.log(toParams);
      // console.log(fromState);
      // console.log(fromParams);

      Auth.getUser()
        .then(function (response) {
          loginCtrl.user = response.data;

          // if (toState.name="home" || toState.name="browse") {
          //   $location.path('/browse');
          // }
          $location.path('/browse');
        })
    });

    // Auth.getUser()
    //   .then(function (response) {
    //     loginCtrl.user = response.data;
    //     $location.path('/browse');
    //   })

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
      $location.path('/')
    }
  }
})();
