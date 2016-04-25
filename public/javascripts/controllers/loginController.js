(function() {
  'use strict';

  angular.module('loginControllers', [])
    .controller('loginController', loginController)

  loginController.$inject = ['Auth', '$location', '$rootScope', 'AuthToken', 'usersFactory'];

  function loginController(Auth, $location, $rootScope, AuthToken, usersFactory) {
    var loginCtrl = this;
    loginCtrl.error = "";
    loginCtrl.newUserData = {};

    $rootScope.$on('$stateChangeSuccess', function () {
      console.log("State Change");

      loginCtrl.loggedIn = Auth.isLoggedIn();

      Auth.getUser()
        .then(function (response) {
          loginCtrl.user = response.data;
          console.log("api/me route", response);
          $location.path('/browse');
        })
    });

    // function to allow user to join tellynet
    loginCtrl.signUp = function () {
      console.log(loginCtrl.newUserData);
      usersFactory.create(loginCtrl.newUserData)
        .then(function(response) {
          console.log("Response from server: ", response);
        })
    }

    // function to handle login
    loginCtrl.doLogin = function () {
      console.log("Do Login");
      console.log(loginCtrl.loginData);

      Auth.login(loginCtrl.loginData.email, loginCtrl.loginData.password)
        .then(function (response) {
          AuthToken.setToken(response.data.token);
          console.log("Response from server", response);
          if (response.data.success) {$location.path('/browse');}
          else {loginCtrl.error = response.data.message;}
        })
    }

    // function to handle logout
    loginCtrl.doLogout = function () {
      Auth.logout();
      loginCtrl.user = '';
      $location.path('/')
    }
  }
})();
