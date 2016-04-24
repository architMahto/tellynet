;(function() {

  'use strict';

  angular.module('navbarDirective', [])
    .directive('navBar', navBar)

  function navBar() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/javascripts/directives/navbar.html',
      scope: {
        login: '='
      },
      controller: ExampleContrller,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  function ExampleContrller() {
    var vm = this;
  }
})()
