var Contract = require("Contract");
var Solidity = require("Solidity");

var keyStorebruh; //temporary, this should not be used
var walletaddr;  //temporary, this should not be used

function deployContract(walletaddress, keystore){ //, walletDecrypt){
    // Say your document has text fields with these IDs
    var privkey = keystore.exportPrivateKey(walletaddress, 'asdf');
    var account = Contract({ privkey: privkey });
    keyStorebruh = keystore;
    walletaddr =walletaddress;
    account.sync("http://hacknet.blockapps.net", function(){
        console.log(account);
    });
    var apiURL = "http://hacknet.blockapps.net";
    var code ="contract GoalManager { \n" +
                    "    struct Goal{ \n" +
                    "        address adr;\n" +
                    "        uint goalTotal;\n" +
                    "        uint contributed;\n" +
                    "     }\n" +
                        
                    "    address owner;\n" +
                    "    uint goalNum;\n" +
                    "    uint lostEther;\n" +
                    "    mapping (uint => Goal) goals;\n" + 

                    "    function GoalManager(){\n" + 
                    "        goalNum = 0;\n" + 
                    "        owner = msg.sender;\n" +
                    "        lostEther =0;\n"+
                    "    }\n" + 
                        
                    "    function createGoal(address goalAdr, uint total) returns (uint goalId){\n" + 
                    "        goals[goalNum].contributed = 0;\n" +
                    "        goals[goalNum].adr = goalAdr;\n" +
                    "        goals[goalNum].goalTotal = total;\n" + 
                    "        goalId = goalNum;\n" +
                    "        goalNum= goalNum + 1;\n" + 
                    "    }\n" + 
                        
                    "    function addToGoal(uint goal, bool toGoal){\n" +
                    "        if(toGoal){\n" + 
                    "            goals[goal].contributed = msg.value;\n" + 
                    "            goals[goal].adr.send(msg.value);\n" + 
                    "        }else{\n" + 
                    "            lostEther = msg.value;\n" + 
                    "        }\n" + 
                    "    }\n" + 
                    "}"
    // This should be an action for some user event, say a button press
    function submitCode() {
        // Constructs a Solidity code object
        Solidity(code).toContract({ // Makes a contract from it
            apiURL:"http://hacknet.blockapps.net",
            fromAccount:Contract({privkey: privkey}),
            value:0,
            gasPrice:1,
            gasLimit:3141592,
        }, displayContract ) // Does this with the contract
    }

    function displayContract(contract) {
    // The actual display is a callback to sync()
    console.log('got here');
    gContract = contract;
        function addToAbidata() {
            // This is a pretty boring way to use a contract,
            // but illustrates how to use it to query the state variables.
            
            console.log("finished with contract");
            // gContract.get(apiURL, function(result){
            //     console.log(result);
            // }, 'owner');
            //console.log(gContract.get['owner']);
            console.log("Pre making goal"+gContract.get['goalNum']);
            createGoal(walletaddr,  "82714c607d2f14de60cbdaa465e3db756f0d72b6", 100, keyStorebruh);
            createGoal(walletaddr,  "82714c607d2f14de60cbdaa465e3db756f0d72b6", 100, keyStorebruh);
            console.log("Post making goal"+gContract.get['goalNum']);
            
        }

        // You have to sync before you can read the state.
        contract.sync(apiURL, addToAbidata);
    }

    submitCode();


}

function makeHex(char){
     switch(char) {
            case 'a':
                return 10;
                break;
            case 'b':
                return 11;
                break;
            case 'c':
                 return 12;
                 break;
            case 'd':
                 return 13;
                 break;
            case 'e':
                 return 14;
                break;
            case 'f':
                 return 15;
                 break;
            default:
                return parseInt(char);
    }
}

function createGoal(senderAdr, goalAdr, goalTotal, keystore){
    var adr = [];
    var tmp;
    for(var i=0, j=0; i<goalAdr.length; i+=2){
                tmp = makeHex(goalAdr[i])*16 + makeHex(goalAdr[i+1]);
                j++;
                adr.push(tmp);
    }
    //console.log(adr);
    function callContract(){
        var privkey = keystore.exportPrivateKey(senderAdr, 'asdf');
        var account = Contract({ privkey: privkey });
        //console.log(gContract.address);
        gContract.call("http://hacknet.blockapps.net", function(result){
            console.log("the goal Made is: " + result);
        }, { funcName:'createGoal', 
            fromAccount:account, 
            value:10, 
            gasPrice:1, 
            gasLimit:3141592 }, {goalAdr:goalAdr, total:goalTotal});
    } 
    callContract();

        
}



