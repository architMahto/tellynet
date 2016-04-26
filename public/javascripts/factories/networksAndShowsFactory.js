;(function() {
  'use strict';

  angular.module('networkAndShowFactory', [])
    .factory('networksAndShowsFactory', networksAndShowsFactory);

  networksAndShowsFactory.$inject = ['$http'];

  function networksAndShowsFactory($http) {
    var networksAndShowsData = {};
    var networksUrl       = 'api/v1/networks/';
    var showsByNetworkUrl = 'api/v1/showsbynetwork/';
    var showsUrl          = 'api/v1/shows/';

    networksAndShowsData.all       = function () {
      return $http.get(networksUrl);
    }

    networksAndShowsData.byCountry = function (country) {
      return $http.get(networksUrl + country);
    }

    networksAndShowsData.byNetwork = function (id) {
      return $http.get(showsByNetworkUrl + id);
    }

    networksAndShowsData.getShow   = function (id) {
      return $http.get(showsUrl + id);
    }

    return networksAndShowsData;
  }
})()
