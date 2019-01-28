const common = require('..//..//common.js')
const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage(process.cwd() + "/../../Server/");

console.log("- - - - - - - - - - - - -");

let expected_data = "HELLO";

{    
    let expression = "{ \"cid\" : \"3733CD977FF8EB18B987357E22CED99F46097F31ECB239E878AE63760E83E4D5\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (GetData from expression)");

        console.log("Test for data expression '" + expression + "'");

        common.CheckReturnedData(data, expected_data)
        
    });
}


{
    let raw_wasm = MyStorage.cache.GetRawDataByRef("uppercase.wasm");

    let arg1 = MyStorage.cache.GetRawDataByRef("file1.txt");

    {
        let args = new Array();

        args.push(arg1);
        
        let wasmWrapper = new KBwasm(raw_wasm, args);
        
        wasmWrapper.Exec().then( data => {

            console.log("Test 2 (direct call KBwasm)");
            
            common.CheckReturnedData(data, expected_data);

        });
    }
}