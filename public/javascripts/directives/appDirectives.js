;(function() {

  'use strict';

  angular.module('appDirectives', [])
    .directive('episodeSelectionShow', episodeSelectionShow)
    .directive('episodeSelectionWatch', episodeSelectionWatch)
    .directive('navBar', navBar)

  function episodeSelectionShow() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/javascripts/directives/episodeSelection/episodeSelectionShow.html'
    };
    return directive;
  }

  function episodeSelectionWatch() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/javascripts/directives/episodeSelection/episodeSelectionWatch.html'
    };
    return directive;
  }

  function navBar() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/javascripts/directives/episodeSelection/navbar.html'
    };
    return directive;
  }
})()
