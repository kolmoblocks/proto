const common = require('../../common.js')
const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage(process.cwd() + "/../../Server/");

console.log("- - - - - - - - - - - - -");

{
    let expected_data = "REHTORB GIB";

    {
        let expression = "{ \"cid\" : \"838ECC02974A726857283E8160A89E25EE6859B1F58117DCA96212E2EA638B41\" }";
            
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
        let raw_wasm = MyStorage.cache.GetRawDataByRef("strreverse.wasm");

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
}

{
    let expected_data = "计设性志标";

    {
        let expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_strreverse_\" }, \"arg1\" : { \"raw\" : \"标志性设计\" } } }";
            
        MyStorage.GetData(expression).then( data => {

            console.log("Test 3 (GetData from expression)");

            console.log("Test for data expression '" + expression + "'");

            common.CheckReturnedData(data, expected_data)
            
        });
    }
}