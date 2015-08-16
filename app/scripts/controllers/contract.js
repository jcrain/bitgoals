var Contract = require("Contract");
var Solidity = require("Solidity");


function deployContract(walletaddress, keystore){ //, walletDecrypt){
    // Say your document has text fields with these IDs
    var privkey = keystore.exportPrivateKey(walletaddress, 'asdf');
    var account = Contract({ privkey: privkey });
    account.sync("http://hacknet.blockapps.net", function(){
        console.log(account);
    });
    var apiURL = "http://hacknet.blockapps.net";
    var code ="contract GoalManager { \n" +
                    "    struct Goal{ \n" +
                    "        address adr;\n" +
                    "        bytes32 description; //string description\n" +
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
                        
                    "    function createGoal(address goalAdr, bytes32 description) returns (uint goalId){\n" + 
                    "        goals[goalNum].adr = goalAdr;\n" +
                    "        goals[goalNum].description = description;\n" + 
                    "        goalId = goalNum;\n" +
                    "        goalNum++;\n" + 
                    "    }\n" + 
                        
                    "    function addToGoal(uint goal, bool toGoal){\n" +
                    "        if(toGoal){\n" + 
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
            abidata.value = "Balance: " + contract.balance;
            abidata.value += "\n\nContract state variables:"
            for (var sym in contract.get) {
                val = contract.get[sym]
                abidata.value += "\n" + sym + " = " + val;
                if (val.isMapping) {
                    abidata.value += " : 1729 => " + val(Types.Int(1729));
                }
            }
            console.log(abidata);
            callContract();
           
        }

        // You have to sync before you can read the state.
        contract.sync(apiURL, addToAbidata);
    }

    submitCode();


}
