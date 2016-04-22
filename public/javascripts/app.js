;(function() {
  'use strict';

  angular.module('tellyNetApp', ["networkAndShowControllers", "networkAndShowFactory", "ui.router", "ngSanitize", "slick", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering"])
    .config(routerConfig)

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']

  function routerConfig ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'networkAndShowController as networkAndShowCtrl'
      })
      $urlRouterProvider.otherwise('/')
  }
}())
