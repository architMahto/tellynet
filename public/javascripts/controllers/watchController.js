;(function() {
  'use strict';

  angular.module('watchControllers', [])
    .controller('watchController', watchController);

  watchController.$inject = ['networksAndShowsFactory', '$stateParams', '$sce', '$timeout', '$state'];

  function watchController(networksAndShowsFactory, $stateParams, $sce, $timeout, $state) {
    var watchCtrl = this;

    watchCtrl.API = null;
    watchCtrl.selectedShowID = $stateParams.id;
    watchCtrl.currentSeason  = $stateParams.s;
    watchCtrl.currentEpisode = $stateParams.e;
    watchCtrl.max = 5000;
    watchCtrl.current = 0;
    watchCtrl.timer = null;
    watchCtrl.isCompleted = false;
    watchCtrl.currentVideo = 0;
    watchCtrl.watchMode = true;

    watchCtrl.onPlayerReady = function (API) {
      watchCtrl.API = API;
    }

    networksAndShowsFactory.getShow($stateParams.id)
      .then(function(res) {
        watchCtrl.videos = res.data;
        watchCtrl.currentSeasonTitle = watchCtrl.videos.seasons[watchCtrl.currentSeason].title;

        watchCtrl.sources = [
          {
            src: $sce.trustAsResourceUrl(watchCtrl.videos.seasons[watchCtrl.currentSeason].episodes[watchCtrl.currentEpisode].videoURL),
            type: "video/webm"
          }
        ]

        watchCtrl.config = {
          autoHide: false,
          autoHideTime: 3000,
          autoPlay: true,
          sources: watchCtrl.sources,
          theme: "bower_components/videogular-themes-default/videogular.css",
          plugins: {
            poster: watchCtrl.videos.seasons[watchCtrl.currentSeason].episodes[watchCtrl.currentEpisode].imageURL
          }
        };

      })

    watchCtrl.changeSeason = function(index) {
      watchCtrl.currentSeason = index;
      watchCtrl.currentSeasonTitle = watchCtrl.videos.seasons[watchCtrl.currentSeason].title;
    }

    watchCtrl.setVideo = function(index) {
      watchCtrl.currentEpisode = index;
      watchCtrl.API.stop();

      $state.go('watch', {id: watchCtrl.selectedShowID, s: watchCtrl.currentSeason, e: watchCtrl.currentEpisode})
    }

    watchCtrl.onComplete = function () {
      if (watchCtrl.currentSeason < watchCtrl.videos.seasons.length - 1) {
        if (watchCtrl.currentEpisode === watchCtrl.videos.seasons[watchCtrl.currentSeason].episodes.length - 1) {
          watchCtrl.currentSeason++;
          watchCtrl.currentEpisode = 0;
          watchCtrl.currentSeasonTitle = watchCtrl.videos.seasons[watchCtrl.currentSeason].title;
        } else {
          watchCtrl.currentEpisode++;
        }
      } else {
        if (watchCtrl.currentEpisode < watchCtrl.videos.seasons[watchCtrl.currentSeason].episodes.length - 1) {
          watchCtrl.currentEpisode++;
        }
      }

      $state.go('watch', {id: watchCtrl.selectedShowID, s: watchCtrl.currentSeason, e: watchCtrl.currentEpisode})
    }

  }
})()
