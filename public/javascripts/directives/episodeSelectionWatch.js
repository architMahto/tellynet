(function() {
  'use strict';

  angular.module('episodeSelectionWatchDirective', [])
    .directive('episodeSelectionWatch', episodeSelectionWatch)

  function episodeSelectionWatch() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/javascripts/directives/episodeSelectionWatch.html'
    };
    return directive;
  }
}());
