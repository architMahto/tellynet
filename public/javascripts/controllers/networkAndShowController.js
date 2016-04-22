;(function() {
  'use strict';

  angular.module('networkAndShowControllers', [])
    .controller('networkAndShowController', networkAndShowController);

  networkAndShowController.$inject = ['networksAndShowsFactory', '$stateParams']

  function networkAndShowController(networksAndShowsFactory, $stateParams) {
    var networkAndShowCtrl = this;

    networkAndShowCtrl.showAll = function () {
      networksAndShowsFactory.all()
        .then(function(response) {
          console.log('Array of networks from API', response.data);
          networkAndShowCtrl.networks = response.data;
        });
    };

    networkAndShowCtrl.selectCountry = function (country) {
      networksAndShowsFactory.byCountry(country)
        .then(function (response) {
          console.log();
          networkAndShowCtrl.networks = response.data;
        });
    };

    networkAndShowCtrl.showAll();
  }
})()
