"use strict";function deployContract(a,b){function c(){Solidity(h).toContract({apiURL:"http://hacknet.blockapps.net",fromAccount:Contract({privkey:e}),value:0,gasPrice:1,gasLimit:3141592},d)}function d(a){function b(){console.log("finished with contract"),createGoal(walletaddr,"82714c607d2f14de60cbdaa465e3db756f0d72b6",100,keyStorebruh)}console.log("got here"),gContract=a,a.sync(g,b)}var e=b.exportPrivateKey(a,"asdf"),f=Contract({privkey:e});keyStorebruh=b,walletaddr=a,f.sync("http://hacknet.blockapps.net",function(){console.log(f)});var g="http://hacknet.blockapps.net",h="contract GoalManager { \n    struct Goal{ \n        address adr;\n        uint goalTotal;\n        uint contributed;\n     }\n    address owner;\n    uint goalNum;\n    uint lostEther;\n    mapping (uint => Goal) goals;\n    function GoalManager(){\n        goalNum = 0;\n        owner = msg.sender;\n        lostEther =0;\n    }\n    function createGoal(address goalAdr, uint total) returns (uint goalId){\n        goals[goalNum].contributed = 0;\n        goals[goalNum].adr = goalAdr;\n        goals[goalNum].goalTotal = total;\n        goalId = goalNum;\n        goalNum= goalNum + 1;\n    }\n    function addToGoal(uint goal, uint toGoal){\n        if(toGoal == 1){\n            goals[goal].contributed = msg.value;\n            goals[goal].adr.send(msg.value);\n        }else{\n            lostEther = msg.value;\n        }\n    }\n}";c()}function makeHex(a){switch(a){case"a":return 10;case"b":return 11;case"c":return 12;case"d":return 13;case"e":return 14;case"f":return 15;default:return parseInt(a)}}function createGoal(a,b,c,d){function e(){var e=d.exportPrivateKey(a,"asdf"),f=Contract({privkey:e});gContract.call("http://hacknet.blockapps.net",function(a){console.log("the goal Made is: "+a),gContract.sync("http://hacknet.blockapps.net",function(){console.log("Post making goal"+gContract.get.goalNum),sendToGoal(walletaddr,0,10,1,d)})},{funcName:"createGoal",fromAccount:f,value:10,gasPrice:1,gasLimit:3141592},{goalAdr:b,total:c})}for(var f,g=[],h=0,i=0;h<b.length;h+=2)f=16*makeHex(b[h])+makeHex(b[h+1]),i++,g.push(f);e()}function sendToGoal(a,b,c,d,e){function f(){console.log("Send to goals");var f=e.exportPrivateKey(a,"asdf"),g=Contract({privkey:f});gContract.call("http://hacknet.blockapps.net",function(a){console.log("the goal Made is: "+a),gContract.sync("http://hacknet.blockapps.net",function(){console.log("Post making goal"+gContract.get.lostEther)})},{funcName:"addToGoal",fromAccount:g,value:c,gasPrice:1,gasLimit:3141592},{goal:b,toGoal:d})}f()}$(document).foundation(),angular.module("bitgoalsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/goals",{templateUrl:"views/goals.html",controller:"GoalsCtrl",controllerAs:"goals"}).otherwise({redirectTo:"/"})}]);var Contract=require("Contract"),Solidity=require("Solidity"),keyStorebruh,walletaddr;angular.module("bitgoalsApp").controller("MainCtrl",["$scope","$location",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var c="http://hacknet.blockapps.net";({app:"bitgoals",email:a.account_email,loginpass:a.account_password,address:a.account_wallet_address,enckey:a.keystore});a.user_object={app:"bitgoals",email:a.account_email,loginpass:a.account_password,address:a.account_wallet_address,enckey:a.keystore},console.log(a.account_email),a.generate_account=function(){var b=a.main_wallet_password;console.log(a.main_wallet_password);var c=ethlightjs.keystore.generateRandomSeed(),d=new ethlightjs.keystore(c,b);d.generateNewAddress(b);a.keystore=d.serialize(),console.log("this "+d.serialize()),a.non_serial=d,a.showRegister=!0,a.showCreateAccount=!1,a.account_wallet_address=d.addresses[0],a.store_super_secret_key()},a.create_user=function(){var b=new XMLHttpRequest;b.open("POST","http://hacknet.blockapps.net/eth/v1.0/wallet",!0);var c={app:"bitgoals",email:a.account_email,loginpass:a.account_password,address:a.account_wallet_address,enckey:a.keystore},d="app="+encodeURIComponent(c.app)+"&email="+encodeURIComponent(c.email)+"&loginpass="+encodeURIComponent(c.loginpass)+"&address="+encodeURIComponent(c.address)+"&enckey="+encodeURIComponent(c.enckey);console.log("params: "+d),b.setRequestHeader("Content-type","application/x-www-form-urlencoded"),b.onreadystatechange=function(){4==b.readyState&&(200===b.status?(console.log(b.responseText),a.turn_on_faucet(b.responseText)):console.log("error",b.statusText))},b.send(d)};var d=require("Contract");console.log(d),a.turn_on_faucet=function(d){console.log("this is the res: "+d);var e=JSON.parse(d);console.log("wallet: "+e.encryptedWallet),console.log("addresses: "+JSON.parse(e.encryptedWallet).addresses);var f=JSON.parse(e.encryptedWallet).addresses,g=new XMLHttpRequest;g.open("POST",c+"/eth/v1.0/faucet",!0);var h="address="+encodeURIComponent(f);g.setRequestHeader("Content-type","application/x-www-form-urlencoded"),g.onload=function(){4==g.readyState&&200==g.status?(console.log("faucet should have worked"),a.store_wallet_info(),a.deploy_contract(),b.path("/goals"),a.$apply()):console.log("error")},console.log("sending faucet request"),g.send(h),console.log("faucet request sent")},a.store_wallet_info=function(){localStorage.setItem("email",a.account_email),localStorage.setItem("password",a.account_password),localStorage.setItem("main_address",a.account_wallet_address)},a.store_super_secret_key=function(){localStorage.setItem("SECRET",a.main_wallet_password)},a.deploy_contract=function(){console.log("running"),deployContract(a.account_wallet_address,a.non_serial)},a.send_money=function(){}}]),angular.module("bitgoalsApp").controller("GoalsCtrl",["$scope","$http",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user_goals=[{name:"Surf Mavericks",desc:"ALL THE SHREDDING",show_name:"surf_mavs",bet_total:"100",bet_increment:"5"},{name:"Climb Mountain",desc:"Hikes",bet_total:"100",bet_increment:"5"}],a.user={wallet:{address:localStorage.getItem("main_address"),latest_block:""},email:localStorage.getItem("email")},a.create_goal=function(){console.log(a.goal_name,a.bet_total,a.bet_increment)},a.get_user_data=function(){b.get("http://hacknet.blockapps.net/eth/v1.0/account?address="+a.user.wallet.address).then(function(b){console.log(b),b.data.length>=1?(console.log(b),a.user.wallet.balance=b.data[0].balance,a.user.wallet.last_block=b.data[0].latestBlockNum):a.get_user_data()})},a.deploy_contract=function(){},a.send_money=function(){},a.get_user_data(),a.create_user_goal=function(){var b=new XMLHttpRequest;b.open("POST","http://hacknet.blockapps.net/eth/v1.0/wallet",!0);var c={app:"bitgoals",email:a.account_email,loginpass:a.account_password,address:a.account_wallet_address,enckey:a.keystore},d="app="+encodeURIComponent("bitgoals")+"&email="+encodeURIComponent(localStorage.getItem("email"))+"&loginpass="+encodeURIComponent(localStorage.getItem("password"))+"&address="+encodeURIComponent(localStorage.getItem("main_address"))+"&enckey="+encodeURIComponent(c.enckey);console.log("params: "+d),b.setRequestHeader("Content-type","application/x-www-form-urlencoded"),b.onreadystatechange=function(){4==b.readyState&&(200===b.status?(console.log(b.responseText),a.turn_on_faucet(b.responseText)):console.log("error",b.statusText))},b.send(d)}}]),angular.module("bitgoalsApp").run(["$templateCache",function(a){a.put("views/goals.html",'<!--   <button ng-click="deploy_contract" class="button">Deploy</button>\n  <button ng-click="send_money" class="button">Send Money</button> --> <div class="row"> <section class="medium-4 columns user__walet"> <nav class="user__goals"> <h4>Current Goals</h4> <ul class="user__goals--nav"> <li class="user__goal" ng-click="surf_mavs=true">Surf Mavericks</li> </ul> </nav> <div class="panel wallet__info"> <h4>Account Info</h4> <div> <strong>Email:</strong><br>{{user.email}} </div> <div> <strong>Wallet:</strong><br>{{user.wallet.address}} </div> <div> <strong>Ballance:</strong><br>{{user.wallet.balance}} </div> <div> <strong>Latest Block:</strong><br>{{user.wallet.last_block}} </div> </div> </section> <div ng-show="surf_mavs" class="medium-8 columns"> <form ng-submit="update_goal()"> <div class="large-12"> <span class="small-12"> <strong>Goal Progress:</strong> 10/100 ETH <div class="progress large-12 radius"> <span class="meter success" style="width: 10%"></span> </div> </span> <span class="small-12 button success">Success Today (2 ETH Saved)</span> <span class="small-12 button alert">Failed Today (2 ETH Fee to community)</span> </div> </form> </div> <div class="medium-8 columns"> <span ng-show="!create_goal_button" ng-click="create_goal_form=true; create_goal_button=true" class="button">Create A New Goal!</span> <form ng-show="create_goal_form" ng-submit="create_goal()"> <div class="large-12"> <label>Goal Name <input ng-model="goal_name" type="text" placeholder="Goal Name"> </label> </div> <div class="large-12"> <label>Bet Total <input ng-model="bet_total" type="text" placeholder="Total Bet"> </label> </div> <div class="large-12"> <label>Bet Increment <input ng-model="bet_increment" type="text" placeholder="Bet Increment"> </label> <button class="button">Save Goal</button> </div> </form> </div> </div>'),a.put("views/main.html",'<div class="login__card"> <h1>Welcome to BitGoals</h1> <p>Bet against yourself and achieve greatness</p> <nav ng-show="!showRegOrLogin"> <span href="#" class="button" ng-click="showCreateAccount=true; showRegOrLogin=true">Register</span> <!-- <span href="#" class="button"ng-click="showLogin=true; showRegOrLogin=true">Login</span> --> </nav> <section ng-show="showCreateAccount"> <form ng-submit="generate_account()"> <div class="row"> <div class="large-12"> <label>Password <input ng-model="main_wallet_password" type="password" placeholder="DON\'T LOOSE THIS!"> </label> <button class="button">Submit</button> </div> </div> </form> </section> <section ng-show="showRegister"> <form ng-submit="create_user()"> <div class="row"> <div class="large-12"> <label>Email <input ng-model="account_email" type="email" placeholder="Email"> </label> <label>Password <input ng-model="account_password" type="password" placeholder="Password"> </label> <label>Account <input ng-model="account_wallet_address" type="text" placeholder="Account"> </label> <button class="button">Submit</button> </div> </div> </form> <!-- <button ng-click="deploy_contract()" class="button">Deploy</button>\n    <button ng-click="send_money()" class="button">Send Money</button> --> </section> <section ng-show="showLogin"> <form> <div class="row"> <div class="large-12"> <label>Email <input type="email" placeholder="Email"> </label> <label>Password <input type="password" placeholder="Password"> </label> <label>Address <input type="text" placeholder="Address"> </label> <button class="button">Submit</button> </div> </div> </form> </section> </div>')}]);