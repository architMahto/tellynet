;
(function() {
  'use strict';

  angular.module('tellyNetApp', ["loginControllers", "networkAndShowControllers", "watchControllers", "navbarDirective", "episodeSelectionShowDirective", "episodeSelectionWatchDirective", "authenticationService", "userFactory", "networkAndShowFactory", "ui.router", "ngSanitize", "ngMessages", "angular-svg-round-progressbar", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering",
          "com.2fdevs.videogular.plugins.next-video"
    ])
    .run(function ($rootScope, $state, $window) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
        if (toState.authenticate) {
          if (!$window.localStorage.getItem('token')) {
            $state.transitionTo('home');
            event.preventDefault();
          }
        }
      })
    })
    .config(routerConfig)

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider']

  function routerConfig($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    // $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
          url: '/welcome',
          templateUrl: 'views/home.html',
          authenticate: false
      })
      .state('signin', {
          url: '/signin',
          templateUrl: 'views/signin.html',
          authenticate: false
      })
      .state('browse', {
          url: '/',
          templateUrl: 'views/browse.html',
          controller: 'networkAndShowController as networkAndShowCtrl',
          authenticate: true
      })
      .state('watch', {
          url: '/watch/:id?s?e/',
          templateUrl: 'views/watch.html',
          controller: 'watchController as watchCtrl',
          authenticate: true
      })
    $urlRouterProvider.otherwise('/')
  }
}())
