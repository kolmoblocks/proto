const storage = require('./KBstorage.js')

const MyStorage = new storage("some path to storage");

if ( false == MyStorage.Init() ) {   
    console.error("Storage Init failed..");
    return;
}

let obj = MyStorage.GetData("63640264849A87C90356129D99EA165E37AA5FABC1FEA46906DF1A7CA50DB492");

console.log(obj);