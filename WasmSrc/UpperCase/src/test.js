const common = require('..//..//common.js')
const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage("127.0.0.1",3000);

let expected_data = "HELLO";

{    
    let expression = "{ \"cid\" : \"3733CD977FF8EB18B987357E22CED99F46097F31ECB239E878AE63760E83E4D5\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (GetData from expression)");

        console.log("Test for data expression '" + expression + "'");

        common.CheckReturnedData(data, expected_data);
        
    });
}


{
    MyStorage.cache.GetRawDataByRef("uppercase.wasm").then( raw_wasm => {

        MyStorage.cache.GetRawDataByRef("file1.txt").then( arg1 => {

            let args = new Array();

            args.push(arg1);
            
            let wasmWrapper = new KBwasm(raw_wasm, args);
            
            wasmWrapper.Exec().then( data => {

                console.log("Test 2 (direct call KBwasm)");
                
                common.CheckReturnedData(data, expected_data);
                
            });

        } );

    } );
}

{
    let expected_data = "ВЕРХНИЙ РЕГИСТР";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_uppercase_\" }, \"arg1\" : { \"raw\" : \"верхний регистр\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 3 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_data);
            
        });
    }
}

{
    let expected_data = "需要技术支持";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_uppercase_\" }, \"arg1\" : { \"raw\" : \"需要技术支持\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 4 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_data);
            
        });
    }
}

{
    let expected_data = "BIG LOW";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_uppercase_\" }, \"arg1\" : { \"raw\" : \"big low\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 5 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_data);
            
        });
    }
}