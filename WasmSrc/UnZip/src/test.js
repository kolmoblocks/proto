const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage(process.cwd() + "/../../Server/");

function CheckReturnedData(data, expexted_data, expected_size)
{
    if ( null == data )
        console.error("Test failed - empty data returned!");
    else
    {
        let result = String.fromCharCode.apply(String, data);

        console.log("Returned data '" + result + "'");

        if ( result.length == expected_size )
        {
            console.log("Size OK");

            if ( result == expexted_data )
            {
                console.log("Content OK");
                console.log("Test pass OK!");
            }
            else
            {
                console.error("Different data!");
                console.error("Exprected data '" + expexted_data + "'");
            }
        }
        else
            console.error("Size of data is not equal for exprected size");   
    }

    console.log("- - - - - - - - - - - - -");
}

console.log("- - - - - - - - - - - - -");


let expexted_data = "hello banana!\n";

let expected_size = new Buffer(expexted_data, 'utf8').length;

{    
    let expression = "{ \"cid\" : \"6CB855C48656FA78D99F84D89515DEF944F3BDB0B2E0204AC0B09B94967B8E15\" }";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (GetData from expression)");

        console.log("Test for data expression '" + expression + "'");

        CheckReturnedData(data, expexted_data, expected_size)
        
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
            
            CheckReturnedData(data, expexted_data, expected_size);

        });
    }
}