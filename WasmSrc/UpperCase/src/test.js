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
    let raw_wasm = MyStorage.cache.GetRawDataByRef("uppercase.wasm");

    let arg1 = MyStorage.cache.GetRawDataByRef("file1.txt");

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
    let expected_string_data = "ВЕРХНИЙ РЕГИСТР";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_uppercase_\" }, \"arg1\" : { \"raw\" : \"верхний регистр\" } } }";
            
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
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_uppercase_\" }, \"arg1\" : { \"raw\" : \"需要技术支持\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 4 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_string_data)
            
        });
    }
}

{
    let expected_string_data = "BIG LOW";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_uppercase_\" }, \"arg1\" : { \"raw\" : \"big low\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 5 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_string_data)
            
        });
    }
}