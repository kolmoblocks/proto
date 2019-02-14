const common = require('..//..//common.js')
const KBstorage = require('..//..//..//Scripts//Node//KBstorage')
const KBwasm = require('..//..//..//Scripts//Node//KBwasm')
var crypto = require('crypto');

const MyStorage = new KBstorage("127.0.0.1",3000);

function hexToBytes(hex) 
{
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));

    return bytes;
}

{
    MyStorage.cache.GetRawDataByRef("hashcalculator.wasm").then( raw_wasm => {

        var AlgName = "SHA256";
        var data_to_hash = "hello world";

        var expected_result = hexToBytes(crypto.createHash(AlgName).update(data_to_hash).digest('hex'));
        
        let args = new Array();

        let arg1 = new Uint8Array(Buffer.from(data_to_hash));
        arg1["ArgName"] = "Input";
        args.push(arg1);

        let arg2 = new Uint8Array(Buffer.from(AlgName));
        arg2["ArgName"] = "AlgName";
        args.push(arg2);
        
        let wasmWrapper = new KBwasm( raw_wasm, args );
        
        wasmWrapper.Exec().then( data => {

            console.log("Test::" + AlgName + ", data: " + data_to_hash);
            
            common.CheckReturnedData(data, "");
            
            if (expected_result.length == data.length) {

                for ( var i = 0; i < data.length; i++ ){
                    if ( expected_result[i] != data[i] ) {
                        console.log("Test failed, diff data!");
                    }
                }

                console.log("Test pass!");
            }
            else
                console.log("Test failed, diff size!");
        });

    });
}

{
    MyStorage.cache.GetRawDataByRef("hashcalculator.wasm").then( raw_wasm => {

        var AlgName = "SHA512";
        var data_to_hash = "hello banana";

        var expected_result = hexToBytes(crypto.createHash(AlgName).update(data_to_hash).digest('hex'));
        
        let args = new Array();

        let arg1 = new Uint8Array(Buffer.from(data_to_hash));
        arg1["ArgName"] = "Input";
        args.push(arg1);

        let arg2 = new Uint8Array(Buffer.from(AlgName));
        arg2["ArgName"] = "AlgName";
        args.push(arg2);
        
        let wasmWrapper = new KBwasm( raw_wasm, args );
        
        wasmWrapper.Exec().then( data => {

            console.log("Test::" + AlgName + ", data: " + data_to_hash);
            
            common.CheckReturnedData(data, "");
            
            if (expected_result.length == data.length) {

                for ( var i = 0; i < data.length; i++ ){
                    if ( expected_result[i] != data[i] ) {
                        console.log("Test failed, diff data!");
                    }
                }

                console.log("Test pass!");
            }
            else
                console.log("Test failed, diff size!");
        });

    });
}