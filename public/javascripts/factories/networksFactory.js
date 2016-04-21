;(function() {
  'use strict';

  angular.module('networkFactory', [])
    .factory('networksFactory', networksFactory);

  networksFactory.$inject = ['$http'];

  function networksFactory($http) {
    var networksData = {};
    var networksUrl = 'http://localhost:3000/api/v1/networks';

    networksData.all = function () {
      console.log("Getting all networks");
      return $http.get(networksUrl);
    }

    return networksData;
  }
})()
