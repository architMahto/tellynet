(function() {
  'use strict';

  angular.module('userFactory', [])
    .factory('usersFactory', usersFactory)

  usersFactory.$inject = ['$http'];

  function usersFactory($http) {
    var userData = {};
    var usersUrl = 'http://localhost:3000/api/v1/users/';

    // get all users
    userData.all = function () {
      return $http.get(usersUrl)
    }

    // get single user
    userData.single = function (id) {
      return $http.get(usersUrl + id);
    }

    // create a user
    userData.create = function (user) {
      return $http.post(usersUrl, user);
    }

    // update a user
    userData.update = function (id, userInfo) {
      return $http.put(usersUrl + id, userInfo);
    }

    // deleting a user
    userData.delete = function (id) {
      return $http.delete(usersUrl + id);
    }

    return userData;
  }
})();
