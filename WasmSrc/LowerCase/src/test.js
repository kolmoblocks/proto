const common = require('..//..//common.js')
const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage("127.0.0.1", 3000);

let expected_data = "big brother";

{    
    let expression = "{ \"cid\" : \"FCE90620CE70369D4B6A5554CD8E52CA43B0AE303A9DE8014A5CAA88B310394D\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (GetData from expression)");

        console.log("Test for data expression '" + expression + "'");

        common.CheckReturnedData(data, expected_data);
        
    });
}


{
    MyStorage.cache.GetRawDataByRef("lowercase.wasm").then( raw_wasm => {
        
        MyStorage.cache.GetRawDataByRef("file3.txt").then( arg1 => {

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
    let expected_string_data = "верхний регистр";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_lowercase_\" }, \"arg1\" : { \"raw\" : \"ВЕРХНИЙ РЕГИСТР\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 3 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_string_data)
            
        });
    }
}

{
    let expected_string_data = "需要技术支持";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_lowercase_\" }, \"arg1\" : { \"raw\" : \"需要技术支持\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 4 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_string_data)
            
        });
    }
}

{
    let expected_string_data = "big low";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_lowercase_\" }, \"arg1\" : { \"raw\" : \"BIG LOW\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 5 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_string_data)
            
        });
    }
}