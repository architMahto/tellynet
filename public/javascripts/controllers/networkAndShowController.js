;(function() {
  'use strict';

  angular.module('networkAndShowControllers', [])
    .controller('networkAndShowController', networkAndShowController);

  networkAndShowController.$inject = ['networksAndShowsFactory', '$stateParams']

  function networkAndShowController(networksAndShowsFactory, $stateParams) {
    var networkAndShowCtrl = this;

    networkAndShowCtrl.networksList = true;
    networkAndShowCtrl.showsList    = false;

    networkAndShowCtrl.showAll = function () {
      networksAndShowsFactory.all()
        .then(function(response) {
          networkAndShowCtrl.networks = response.data;
        });
    };

    networkAndShowCtrl.selectCountry = function (country) {
      networksAndShowsFactory.byCountry(country)
        .then(function (response) {
          networkAndShowCtrl.networks = response.data;
        });
    };

    networkAndShowCtrl.getShows = function (id) {
      networksAndShowsFactory.byNetwork(id)
        .then(function (response) {
          console.log(response.data);
          networkAndShowCtrl.shows = response.data;
          networkAndShowCtrl.toggleShowsAndNetworks();
        });
    }

    networkAndShowCtrl.toggleShowsAndNetworks = function () {
      networkAndShowCtrl.networksList = !networkAndShowCtrl.networksList;
      networkAndShowCtrl.showsList    = !networkAndShowCtrl.showsList;
    }

    networkAndShowCtrl.showAll();
  }
})()
