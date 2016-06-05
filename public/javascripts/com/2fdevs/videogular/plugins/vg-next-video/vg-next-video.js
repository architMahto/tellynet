(function() {
  'use strict';

  angular.module("com.2fdevs.videogular.plugins.next-video", ["angular-svg-round-progressbar"])
    .run(["$templateCache", function ($templateCache) {
      $templateCache.put("vg-templates/vg-next-video",
        '<div class="loader-container" ng-if="ctrl.isCompleted">' +
        '<div round-progress max="ctrl.max" current="ctrl.current" color="#eeeeee" bgcolor="#333333" radius="50" stroke="10"></div>' +
        '<div class="cancel" ng-click="ctrl.cancelTimer()">cancel</div>' +
        '</div>')
    }])
    .directive("vgNextVideo", vgNextVideo)

  function vgNextVideo() {
    var directive = {
      restrict: "EA",
      require: "^videogular",
      templateUrl: function (elem, attrs) {
        return attrs.vgTemplate || 'vg-templates/vg-next-video';
      },
      scope: {
        vgVideos: "=",
        vgTime: "=?",
        vgCurrentSeason: "=",
        vgCurrentEpisode: "="
      },
      controller: ExampleController,
      controllerAs: "ctrl",
      link: linkFunction
    }

    return directive;

    function linkFunction(scope, elem, attr, API) {
      scope.API = API;
    }
  }

  ExampleController.$inject = ['$scope', '$timeout'];

  function ExampleController($scope, $timeout) {
    var ctrl = this;

    ctrl.max = $scope.vgTime || 5000;
    ctrl.timer = null;
    ctrl.isCompleted = false;

    // console.log("max:", ctrl.max);
    // console.log("timer:", ctrl.timer);
    // console.log("isCompleted:", ctrl.isCompleted);
    // console.log("vgVideos:", ctrl.vgVideos);
    // console.log("vgTime:", ctrl.vgTime);
    // console.log("vgCurrentSeason:", ctrl.vgCurrentSeason);
    // console.log("vgCurrentEpisode:", ctrl.vgCurrentEpisode);
  }
})();
