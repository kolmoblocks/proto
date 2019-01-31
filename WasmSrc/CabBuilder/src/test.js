const common = require('../../common.js')
const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage("127.0.0.1", 3000);

console.log("- - - - - - - - - - - - -");

{
    let val1 = "123456";
    let val2 = "7890";

    let expected_data = val1 + val2;

    let expression = "{ \"cid\": \"_data_bundle1_\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (concat of two args)");

        console.log("Test for data expression '" + expression + "'");

        console.log(data);
    });
}

