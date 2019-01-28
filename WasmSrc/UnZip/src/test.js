const common = require('..//..//common.js')
const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage(process.cwd() + "/../../Server/");

console.log("- - - - - - - - - - - - -");


let expected_data = "hello banana!";

{    
    let expression = "{ \"cid\" : \"6CB855C48656FA78D99F84D89515DEF944F3BDB0B2E0204AC0B09B94967B8E15\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (GetData from expression)");

        console.log("Test for data expression '" + expression + "'");

        common.CheckReturnedData(data, expected_data)
        
    });
}


{
    let raw_wasm = MyStorage.cache.GetRawDataByRef("unzip.wasm");

    let arg1 = MyStorage.cache.GetRawDataByRef("hellobanana.zip");

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