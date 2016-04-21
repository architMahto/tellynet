;(function() {
  'use strict';

  angular.module('networkControllers', [])
    .controller('networkController', networkController);

  networkController.$inject = ['networksFactory', '$stateParams']

  function networkController(networksFactory, $stateParams) {
    var networkCtrl = this;

    networkCtrl.showAll = function () {
      networksFactory.all()
        .then(function(response) {
          console.log('Array of networks from API', response.data);
          networkCtrl.networks = response.data;
        });
    };

    networkCtrl.selectCountry = function (country) {
      networksFactory.byCountry(country)
        .then(function (response) {
          console.log();
          networkCtrl.networks = response.data;
        });
    };

    networkCtrl.showAll();
  }
})()
