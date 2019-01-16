const KBstorage = require('./KBstorage.js')

const MyStorage = new KBstorage("some path to storage");

if ( false == MyStorage.Init() ) {   
    console.error("Storage Init failed..");
    return;
}

let data = MyStorage.GetData("_cid1_");

console.log(data);