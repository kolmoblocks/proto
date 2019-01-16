const storage = require('./KBstorage.js')

const MyStorage = new storage("some path to storage");

if ( false == MyStorage.Init() ) {   
    console.error("Storage Init failed..");
    return;
}

let obj = MyStorage.GetData("_test_");

console.log(obj);