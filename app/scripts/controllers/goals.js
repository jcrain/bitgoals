'use strict';

/**
 * @ngdoc function
 * @name bitgoalsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bitgoalsApp
 */
angular.module('bitgoalsApp')
  .controller('GoalsCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user_goals =[
      {
        name: "Surf Mavericks",
        desc: "ALL THE SHREDDING",
        show_name: "surf_mavs",
        bet_total: "100",
        bet_increment: "5"
      },
      {
        name: "Climb Mountain",
        desc: "Hikes",
        bet_total: "100",
        bet_increment: "5"
      }
    ];

    $scope.user = {
      wallet: {
        address: localStorage.getItem("main_address"),
        latest_block: ''
      },
      email: localStorage.getItem("email")
    }
    

    $scope.create_goal = function() {
      console.log($scope.goal_name, $scope.bet_total, $scope.bet_increment);
    };

    $scope.get_user_data = function() {
      $http.get('http://hacknet.blockapps.net/eth/v1.0/account?address=' + $scope.user.wallet.address)
        .then(function(res){
          // Sometimes this returns and empty array
          console.log(res);
          if( res.data.length >= 1 ) {
            console.log(res);
            $scope.user.wallet.balance = res.data[0].balance;
            $scope.user.wallet.last_block = res.data[0].latestBlockNum;
          } else {
            $scope.get_user_data();
          }
        });
    }

    $scope.deploy_contract = function() {

    };

    $scope.send_money = function(){

    };

    $scope.get_user_data();

    $scope.create_user_goal = function(){
      var oReq = new XMLHttpRequest();
        oReq.open("POST", "http://hacknet.blockapps.net/eth/v1.0/wallet", true);
        var user_object = {
            app: "bitgoals",
            email: $scope.account_email,
            loginpass: $scope.account_password,
            address: $scope.account_wallet_address,
            enckey: $scope.keystore
          };

        var params = "app="+encodeURIComponent('bitgoals')
                       +"&email="+encodeURIComponent(localStorage.getItem("email"))
                       +"&loginpass=" + encodeURIComponent(localStorage.getItem("password"))
                       +"&address=" + encodeURIComponent(localStorage.getItem("main_address"))
                       +"&enckey=" + encodeURIComponent(user_object.enckey);
 
 
        console.log("params: " + params);
        oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        oReq.onreadystatechange = function () {
          if (oReq.readyState == 4) {
            if (oReq.status === 200) {
                console.log(oReq.responseText);
                $scope.turn_on_faucet(oReq.responseText);
                //callback(oReq.responseText);
             } else {
                console.log("error", oReq.statusText);
            }
          } 
        }
        oReq.send(params);
    };
  });
