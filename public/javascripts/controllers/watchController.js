;(function() {
  'use strict';

  angular.module('watchControllers', [])
    .controller('watchController', watchController);

  watchController.$inject = ['$stateParams'];

  function watchController($stateParams) {
    var watchCtrl = this;

    watchCtrl.API = null;

    console.log($stateParams.id, $stateParams.s, $stateParams.e);
  }
})()
