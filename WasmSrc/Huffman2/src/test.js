const common = require('..//..//common.js')
const KBstorage = require('..//..//..//Scripts//Node//KBstorage')
const KBwasm = require('..//..//..//Scripts//Node//KBwasm')

const MyStorage = new KBstorage("127.0.0.1", 3000);

{    
    let expression = "{ \"cid\" : \"_book1_\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (GetData from expression)");

        console.log("Test for data expression '" + expression + "'");

        console.log(common.stringFromUTF8Array(data));
        
    });
}
