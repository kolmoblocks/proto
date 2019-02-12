
const common = require('../../common.js')
const KBstorage = require('..//..//..//Scripts//Node/KBstorage')
const KBwasm = require('..//..//..//Scripts//Node/KBwasm')

const MyStorage = new KBstorage("127.0.0.1", 3000);

console.log("- - - - - - - - - - - - -");

{
    let val1 = "123456";
    let val2 = "7890";

    let expected_data = val1 + val2;

    let expression = "{\"exec\":{\"wasm\":{\"ref\":\"concat.wasm\"},\"arg1\":{\"raw\":\"" + val1 + "\"},\"arg2\":{\"raw\":\"" + val2 + "\"}}}";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 1 (concat of two args)");

        console.log("Test for data expression '" + expression + "'");

        common.CheckReturnedData(data, expected_data)
    });
}

{
    let val1 = "hello";
    let val2 = ",";
    let val3 = "banana";

    let expected_data = val1 + val2 + val3;

    let expression = "{\"exec\":{\"wasm\":{\"ref\":\"concat.wasm\"},\"arg1\":{\"raw\":\"" + val1 + "\"},\"arg2\":{\"raw\":\"" + val2 + "\"},\"arg3\":{\"raw\":\"" + val3 + "\"}}}";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 2 (concat of three args)");

        console.log("Test for data expression '" + expression + "'");

        common.CheckReturnedData(data, expected_data)
    });
}

{
    MyStorage.cache.GetRawDataByRef("concat.wasm").then( raw_wasm => {

        let val1 = "Cats";
        let val2 = "Rulez";
        let val3 = "World";

        let expected_data = val1 + val2 + val3;

        let arg1 = new Buffer(val1, 'utf8');
        arg1["ArgName"] = "ARG1";

        let arg2 = new Buffer(val2, 'utf8');
        arg2["ArgName"] = "Arg2";

        let arg3 = new Buffer(val3, 'utf8');
        arg3["ArgName"] = "arg3";

        {
            let args = new Array();

            // right arg order
            args.push(arg1);
            args.push(arg2);
            args.push(arg3);
        
            let wasmWrapper = new KBwasm(raw_wasm, args);
            
            wasmWrapper.Exec().then( data => {

                console.log("Test 3 (direct call KBwasm, concat of three args with right arg order)");
                
                common.CheckReturnedData(data, expected_data);

            });
        }

        {
            let args = new Array();
        
            // wrong arg order
            args.push(arg2);
            args.push(arg1);
            args.push(arg3);
    
            let wasmWrapper = new KBwasm(raw_wasm, args);
            
            wasmWrapper.Exec().then( data => {
    
                console.log("Test 4 (direct call KBwasm, concat of three args with wrong arg order)");
                
                common.CheckReturnedData(data, expected_data);
    
            });
        }

    });
}


{
    let val1 = " 123 456 ";
    let val2 = " 7890 ";

    let expected_data = val1 + val2;

    let expression = "{\"exec\":{\"wasm\":{\"ref\":\"concat.wasm\"},\"arg1\":{\"raw\":\"" + val1 + "\"},\"arg2\":{\"raw\":\"" + val2 + "\"}}}";
        
    MyStorage.GetData(expression).then( data => {

        console.log("Test 5 (concat of two args with spaces)");

        console.log("Test for data expression '" + expression + "'");

        common.CheckReturnedData(data, expected_data)
    });
}