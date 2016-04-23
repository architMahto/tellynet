;(function() {
  'use strict';

  angular.module('tellyNetApp', ["networkAndShowControllers", "watchControllers", "appDirectives", "networkAndShowFactory", "ui.router", "ngSanitize", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering"])
    .config(routerConfig)

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']

  function routerConfig ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'networkAndShowController as networkAndShowCtrl'
      })
      .state('watch', {
        url: '/watch/:id?s?e/',
        templateUrl: 'views/watch.html',
        controller: 'watchController as watchCtrl'
      })
      $urlRouterProvider.otherwise('/')
  }
}())
