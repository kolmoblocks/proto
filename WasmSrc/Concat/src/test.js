const KBstorage = require('..//..//..//BrowserScript/KBstorage')

const MyStorage = new KBstorage(process.cwd() + "/../../Server/");


let val1 = "123456";

let val2 = "7890";

let expected_size = new Buffer(val1, 'utf8').length + new Buffer(val2, 'utf8').length;

let expression = "{\"exec\":{\"wasm\":{\"ref\":\"concat.wasm\"},\"arg1\":{\"raw\":\"" + val1 + "\"},\"arg2\":{\"raw\":\"" + val2 + "\"}}}";
    
MyStorage.GetData(expression).then( data => {

    console.log("Test for data expression '" + expression + "'");

    if ( null == data )
        console.error("Test failed - empty data returned!");
    else
    {
        let result = String.fromCharCode.apply(String, data);
        
        console.log("Returned data '" + result + "'");

        if ( result.length == expected_size )
        {
            console.log("Size OK");

            if ( result == (val1 + val2) )
            {
                console.log("Content OK");
                console.log("Test pass OK!");
            }
            else
            {
                console.error("Different data!");
                console.error("Exprected data '" + (val1 + val2) + "'");
            }
        }
        else
            console.error("Size of data is not equal for exprected size");   
    }
});

