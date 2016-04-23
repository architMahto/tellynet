;(function() {
  'use strict';

  angular.module('watchControllers', [])
    .controller('watchController', watchController);

  watchController.$inject = ['networksAndShowsFactory', '$stateParams', '$sce', '$q'];

  function watchController(networksAndShowsFactory, $stateParams, $sce, $q) {
    var watchCtrl = this;

    watchCtrl.API = null;
    watchCtrl.currentSeason  = $stateParams.s;
    watchCtrl.currentEpisode = $stateParams.e;

    watchCtrl.onPlayerReady = function (API) {
      videoCtrl.API = API;
    }

    networksAndShowsFactory.getShow($stateParams.id)
      .then(function(res) {
        watchCtrl.videos = res.data;

      })
      .then(function () {
        watchCtrl.sources = {
          src: $sce.trustAsResourceUrl(watchCtrl.videos.seasons[watchCtrl.currentSeason].episodes[watchCtrl.currentEpisode].videoURL),
          type: "video/webm"
        }
      })
      .then(function () {
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


  }
})()
