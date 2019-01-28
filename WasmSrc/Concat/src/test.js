const common = require('../../common.js')
const KBstorage = require('..//..//..//BrowserScript/KBstorage')
const KBwasm = require('..//..//..//BrowserScript/KBwasm')

const MyStorage = new KBstorage(process.cwd() + "/../../Server/");

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
    let raw_wasm = MyStorage.cache.GetRawDataByRef("concat.wasm");

    let val1 = "Cats";
    let val2 = "Rulez";
    let val3 = "World";

    let expected_data = val1 + val2 + val3;

    let arg1 = new Buffer(val1, 'utf8');
    let arg2 = new Buffer(val2, 'utf8');
    let arg3 = new Buffer(val3, 'utf8');

    {
        let args = new Array();

        // push order matter!
        args.push(arg1);
        args.push(arg2);
        args.push(arg3);
    
        let wasmWrapper = new KBwasm(raw_wasm, args);
        
        wasmWrapper.Exec().then( data => {

            console.log("Test 3 (direct call KBwasm, concat of three args with right order)");
            
            common.CheckReturnedData(data, expected_data);

        });
    }

    {
        let args = new Array();
    
        arg1["ArgIndex"] = 0; // <--- arg1 always will be first arg while wasm exec
        arg2["ArgIndex"] = 3; // <--- arg2 always will be second arg while wasm exec
        arg3["ArgIndex"] = 99; // <--- arg3 always will be third arg while wasm exec

        // push order does't matter
        args.push(arg2); // first arg in array of arguments
        args.push(arg1); // second arg in array of arguments
        args.push(arg3); // third arg in array of arguments

        let wasmWrapper = new KBwasm(raw_wasm, args);
        
        wasmWrapper.Exec().then( data => {

            console.log("Test 4 (direct call KBwasm, concat of three args with wrong order but with indexes)");
            
            common.CheckReturnedData(data, expected_data);

        });
    }
}