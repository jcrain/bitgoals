'use strict';

/**
 * @ngdoc function
 * @name bitgoalsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bitgoalsApp
 */
angular.module('bitgoalsApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.goals =[
      {
        name: "mavs",
        desc: "ALL THE SHREDDING",
        bet_total: "100",
        bet_increment: "5"
      },
      {
        name: "Mountain",
        desc: "Hikes",
        bet_total: "100",
        bet_increment: "5"
      }
    ]
    $scope.create_goal = function(){
      console.log($scope.goal_name, $scope.bet_total, $scope.bet_increment);
    };
  });
