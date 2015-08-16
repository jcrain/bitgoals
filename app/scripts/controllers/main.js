'use strict';
/**
 * @ngdoc function
 * @name bitgoalsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bitgoalsApp
 */
angular.module('bitgoalsApp')
  .controller('MainCtrl', function ($scope, $location) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var apiURL = "http://hacknet.blockapps.net";
    var user_object = {
      app: "bitgoals",
      email: $scope.account_email,
      loginpass: $scope.account_password,
      address: $scope.account_wallet_address,
      enckey: $scope.keystore
    }

    $scope.user_object = {
      app: "bitgoals",
      email: $scope.account_email,
      loginpass: $scope.account_password,
      address: $scope.account_wallet_address,
      enckey: $scope.keystore
    }
    console.log($scope.account_email);

    $scope.generate_account = function() {
      var pass = $scope.main_wallet_password;

      console.log($scope.main_wallet_password);

      var randomSeed = ethlightjs.keystore.generateRandomSeed();
      var keystore = new ethlightjs.keystore(randomSeed, pass);
      var addr = keystore.generateNewAddress(pass);

      $scope.keystore = keystore.serialize();
      console.log("this " +keystore.serialize());
      $scope.non_serial = keystore;
      $scope.showRegister = true;
      $scope.showCreateAccount = false;
      $scope.account_wallet_address = keystore.addresses[0];

      
    }

    $scope.create_user = function(){
      var oReq = new XMLHttpRequest();
        oReq.open("POST", "http://hacknet.blockapps.net/eth/v1.0/wallet", true);
        var user_object = {
            app: "bitgoals",
            email: $scope.account_email,
            loginpass: $scope.account_password,
            address: $scope.account_wallet_address,
            enckey: $scope.keystore
          };

        var params = "app="+encodeURIComponent(user_object.app)
                       +"&email="+encodeURIComponent(user_object.email)
                       +"&loginpass=" + encodeURIComponent(user_object.loginpass)
                       +"&address=" + encodeURIComponent(user_object.address)
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
    }



    var Contract = require("Contract");
    console.log(Contract);
    
    $scope.turn_on_faucet = function(res){
      console.log("this is the res: " + res)
      var data = JSON.parse(res);
      
      console.log("wallet: " + data.encryptedWallet);
      console.log("addresses: " + JSON.parse(data.encryptedWallet).addresses);
      var faucetAddr = JSON.parse(data.encryptedWallet).addresses;
      var oReq = new XMLHttpRequest();
      oReq.open("POST", apiURL + "/eth/v1.0/faucet", true);
      var params = "address=" + encodeURIComponent(faucetAddr);
      oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      oReq.onload = function () {
        if (oReq.readyState == 4 && oReq.status == 200) {
          console.log("faucet should have worked");
          $scope.get_wallet_info();
          $location.path( "/goals" );
          $scope.$apply();
        } else { 
          console.log("error");
        }
      }
      console.log("sending faucet request");
      oReq.send(params);
      console.log("faucet request sent");
      
    };

    $scope.get_wallet_info = function() {
      localStorage.setItem("email", $scope.account_email);
      localStorage.setItem("password", $scope.account_password);
      localStorage.setItem("main_address", $scope.account_wallet_address);
    };

    $scope.store_super_secret_key = function() {
      // THIS IS TERRIBLE
      // THIS IS JUST FOR TESTING CONTRACTS
      // NEVER DO THIS. EVER...
      localStorage.setItem("SECRET", $scope.main_wallet_password);
    };

    $scope.deploy_contract = function(){
      console.log('running');
      deployContract($scope.account_wallet_address, $scope.non_serial);
    };

    $scope.send_money = function(){

    };

  });
