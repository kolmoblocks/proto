const KBstorage = require('..//..//..//BrowserScript/KBstorage')

const MyStorage = new KBstorage(process.cwd() + "/../../Server/");

/*
        {
            "exec" : {
                "wasm" : {
                    "ref" : "concat.wasm"
                },
                "arg1" : {
                    "raw" : "123456"
                },
                "arg2" : {
                    "raw" : "7890"
                }
            }
        }
*/

let expression = "{\"exec\":{\"wasm\":{\"ref\":\"concat.wasm\"},\"arg1\":{\"raw\":\"123456\"},\"arg2\":{\"raw\":\"7890\"}}}";
    
MyStorage.GetData(expression).then( data => {

    if ( null == data )
    {
        console.log("Empty data");
    }
    else
    {
        console.log(data);
    }
});
