(function() {
  'use strict';

  angular.module('authenticationService', [])
    .factory('Auth', Auth)
    .factory('AuthInterceptor', AuthInterceptor)
    .factory('AuthToken', AuthToken)

  function Auth($http, $q, AuthToken) {
    // auth factory object
    var authFactory = {};

    // handle user login
    authFactory.login = function (email, password) {
      // return the promise object from 'api/v1/signIn'
      return $http.post('/api/v1/signIn', {email: email, password: password});
    }

    // handle user logout
    authFactory.logout = function () {
      // clear the token
      AuthToken.setToken();
    }

    // check if a user is logged in
    // checks if there is a local token
    authFactory.isLoggedIn = function () {
      if (AuthToken.getToken()) {
        return true;
      } else {
        return false;
      }
    }

    // get the logged in user info
    authFactory.getUser = function () {
      if (AuthToken.getToken()) {
        return $http.get('/api/v1/me');
      } else {
        return $q.reject({message: 'User has no token'});
      }
    }

    return authFactory;
  }

  function AuthToken($window) {
    var authTokenFactory = {};

    // get the token out of local storage
    authTokenFactory.getToken = function () {
      return $window.localStorage.getItem('token');
    }

    // set the token or clear the token
    // if token is passed clear the token
    // if there is no token, clear it from local storage
    authTokenFactory.setToken = function (token) {
      if (token) {$window.localStorage.setItem('token', token);}
      else {$window.localStorage.removeItem('token');}
    }

    return authTokenFactory;
  }

  function AuthInterceptor($q, AuthToken, $location) {
    console.log("AuthInterceptor Running");
    var interceptorFactory = {};

    // attach the token to every HTTP request
    interceptorFactory.request = function (config) {
      // grab the token
      var token = AuthToken.getToken();

      // if the token exists, add it to the header as x-access-token
      if (token) {config.headers['x-access-token'] = token;}

      return config;
    }

    // redirect if a token does not authenticate
    // happens on response errors
    interceptorFactory.responseError = function (response) {
      console.log("Server Error");
      console.log(response.status);

      // if server returns a 403 forbidden response, redirect to home page.
      if (response.status == 403) $location.path('/');

      // returns the errors from the server with a promise
      return $q.reject(response);
    }

    return interceptorFactory;
  }

})();
