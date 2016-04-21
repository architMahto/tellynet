;(function() {
  'use strict';

  angular.module('networkControllers', [])
    .controller('networkController', networkController);

  networkController.$inject = ['networksFactory']

  function networkController(networksFactory) {
    var networkCtrl = this;

    networksFactory.all()
      .then(function(response) {
        console.log('Array of networks from API', response.data);
        networkCtrl.networks = response.data;
      })
  }
})()
