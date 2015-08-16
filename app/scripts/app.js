'use strict';
$(document).foundation();

/**
 * @ngdoc overview
 * @name bitgoalsApp
 * @description
 * # bitgoalsApp
 *
 * Main module of the application.
 */
angular
  .module('bitgoalsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/goals', {
        templateUrl: 'views/goals.html',
        controller: 'GoalsCtrl',
        controllerAs: 'goals'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
