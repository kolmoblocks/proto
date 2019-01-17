const KBstorage = require('./BrowserScript/KBstorage.js')

const MyStorage = new KBstorage();

{
    // hello banana
    let data = MyStorage.GetData("{ \"cid\" : \"7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C\" }");

    if ( null == data )
    {
        console.log("Empty data");
        return;
    }

    console.log("first");
    console.log("MIME " + data["MIME"]);
    console.log("size " + data["size"]);
    console.log(data);
}

{
    // hello banana
    let data = MyStorage.GetData("{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_concat_\" }, \"arg1\" : { \"cid\" : \"2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824\" }, \"arg2\" : { \"cid\" : \"B493D48364AFE44D11C0165CF470A4164D1E2609911EF998BE868D46ADE3DE4E\" } } }");

    if ( null == data )
    {
        console.log("Empty data");
        return;
    }

    console.log("second");
    console.log("MIME " + data["MIME"]);
    console.log("size " + data["size"]);
    console.log(data);
    
}