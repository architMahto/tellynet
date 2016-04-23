;(function() {
  'use strict';

  angular.module('networkAndShowControllers', [])
    .controller('networkAndShowController', networkAndShowController);

  networkAndShowController.$inject = ['networksAndShowsFactory', '$stateParams', '$state']

  function networkAndShowController(networksAndShowsFactory, $stateParams, $state) {
    var networkAndShowCtrl = this;

    // flag for viewing networks
    networkAndShowCtrl.networksList   = true;
    // flag for viewing shows
    networkAndShowCtrl.showsList      = false;
    // flag for showing info about the show
    networkAndShowCtrl.showInfo       = false;
    // flag for showing the show details
    networkAndShowCtrl.showDetails    = true;
    // flag for showing episodes
    networkAndShowCtrl.showEpisodes   = false;
    // index of season for show
    networkAndShowCtrl.currentSeason  = 0;
    // index of episode
    networkAndShowCtrl.currentEpisode = 0;

    // gets all networks
    networkAndShowCtrl.showAll = function () {
      networksAndShowsFactory.all()
        .then(function(response) {
          networkAndShowCtrl.networks = response.data;
        });
    };

    // filters networks by country
    networkAndShowCtrl.selectCountry = function (country) {
      networksAndShowsFactory.byCountry(country)
        .then(function (response) {
          networkAndShowCtrl.networks = response.data;
        });
    };

    // gets shows from network
    networkAndShowCtrl.getShows = function (id) {
      networksAndShowsFactory.byNetwork(id)
        .then(function (response) {
          networkAndShowCtrl.shows = response.data;
          networkAndShowCtrl.toggleShowsAndNetworks();
        });
    }

    // toggle between networks and shows
    networkAndShowCtrl.toggleShowsAndNetworks = function () {
      networkAndShowCtrl.networksList   = !networkAndShowCtrl.networksList;
      networkAndShowCtrl.showsList      = !networkAndShowCtrl.showsList;
      networkAndShowCtrl.showInfo       = false;
      networkAndShowCtrl.currentSeason  = 0;
      networkAndShowCtrl.currentEpisode = 0;
      networkAndShowCtrl.currentShow    = null;
    }

    // toggle show info
    networkAndShowCtrl.selectShow = function (index) {
      networkAndShowCtrl.showInfo    = !networkAndShowCtrl.showInfo;
      networkAndShowCtrl.currentShow = networkAndShowCtrl.shows[index];
      networkAndShowCtrl.currentSeasonTitle = networkAndShowCtrl.currentShow.seasons[networkAndShowCtrl.currentSeason].title;
    }

    // change season of show
    networkAndShowCtrl.changeSeason = function(index) {
      networkAndShowCtrl.currentSeason  = index;
      networkAndShowCtrl.currentSeasonTitle = networkAndShowCtrl.currentShow.seasons[networkAndShowCtrl.currentSeason].title;
    }

    // play episode
    networkAndShowCtrl.playEpisode = function(index) {
      networkAndShowCtrl.currentEpisode = index;
      $state.go('watch', {id: networkAndShowCtrl.currentShow._id,
                          s: networkAndShowCtrl.currentSeason,
                          e: networkAndShowCtrl.currentEpisode})
    }

    // show all the networks from the beginning
    networkAndShowCtrl.showAll();
  }
})()
