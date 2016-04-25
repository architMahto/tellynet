;(function() {
  'use strict';

  angular.module('tellyNetApp', ["loginControllers", "networkAndShowControllers", "watchControllers", "navbarDirective", "episodeSelectionShowDirective", "episodeSelectionWatchDirective", "authenticationService", "userFactory", "networkAndShowFactory", "ui.router", "ngSanitize", "ngMessages", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering"])
    .config(routerConfig)

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider']

  function routerConfig ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('browse', {
        url: '/browse',
        templateUrl: 'views/browse.html',
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
