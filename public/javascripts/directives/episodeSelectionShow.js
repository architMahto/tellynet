(function() {
  'use strict';

  angular.module('episodeSelectionShowDirective', [])
    .directive('episodeSelectionShow', episodeSelectionShow)

  function episodeSelectionShow() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/javascripts/directives/episodeSelectionShow.html'
    };
    return directive;
  }
}());
