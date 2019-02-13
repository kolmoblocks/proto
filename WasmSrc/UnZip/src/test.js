const common = require('..//..//common.js')
const KBstorage = require('..//..//..//Scripts//Node//KBstorage')
const KBwasm = require('..//..//..//Scripts//Node//KBwasm')

const MyStorage = new KBstorage("127.0.0.1",3000);

console.log("- - - - - - - - - - - - -");


let expected_data = "hello banana!\n";

{    
    let expression = "{ \"cid\" : \"6CB855C48656FA78D99F84D89515DEF944F3BDB0B2E0204AC0B09B94967B8E15\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (GetData from expression)");

        console.log("Test for data expression '" + expression + "'");

        common.CheckReturnedData(data, expected_data)
        
    });
}


{
    MyStorage.cache.GetRawDataByRef("unzip.wasm").then( raw_wasm => {

        MyStorage.cache.GetRawDataByRef("hellobanana.zip").then( arg1 => {

            let args = new Array();

            arg1["ArgName"] = "any name for this wasm";
            args.push(arg1);

            let wasmWrapper = new KBwasm(raw_wasm, args);
            
            wasmWrapper.Exec().then( data => {

                console.log("Test 2 (direct call KBwasm)");
                
                common.CheckReturnedData(data, expected_data);

            });

        } );

    } );
}