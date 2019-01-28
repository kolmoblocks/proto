const common = require('..//..//common.js')
const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage(process.cwd() + "/../../Server/");

console.log("- - - - - - - - - - - - -");

let expected_data = "big brother";

{    
    let expression = "{ \"cid\" : \"FCE90620CE70369D4B6A5554CD8E52CA43B0AE303A9DE8014A5CAA88B310394D\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (GetData from expression)");

        console.log("Test for data expression '" + expression + "'");

        // why not common.CheckReturnedData(data, expected_data) ?
        // because data for expression is in the file
        // then utf8 string in file, it's data has BOM (first 3 bytes)
        let rd = common.stringFromUTF8Array(data).trim();
        if ( rd == expected_data )
        {
            console.log("Returned data '" + rd + "'");
            console.log("Test pass OK!");
        }
        else
            common.CheckReturnedData(data, expected_data);
        
        console.log("- - - - - - - - - - - - -");
    });
}


{
    let raw_wasm = MyStorage.cache.GetRawDataByRef("lowercase.wasm");

    let arg1 = MyStorage.cache.GetRawDataByRef("file3.txt");

    {
        let args = new Array();

        args.push(arg1);
        
        let wasmWrapper = new KBwasm(raw_wasm, args);
        
        wasmWrapper.Exec().then( data => {

            console.log("Test 2 (direct call KBwasm)");
            
            // why not common.CheckReturnedData(data, expected_data) ?
            // because data for expression is in the file
            // then utf8 string in file, it's data has BOM (first 3 bytes)
            let rd = common.stringFromUTF8Array(data).trim();
            if ( rd == expected_data )
            {
                console.log("Returned data '" + rd + "'");
                console.log("Test pass OK!");
            }
            else
                common.CheckReturnedData(data, expected_data);
            
            console.log("- - - - - - - - - - - - -");

        });
    }
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