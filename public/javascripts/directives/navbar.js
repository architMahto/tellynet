;(function() {

  'use strict';

  angular.module('navbarDirective', [])
    .directive('navBar', navBar)

  function navBar() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/javascripts/directives/navbar.html'
    };
    return directive;
  }
})()
