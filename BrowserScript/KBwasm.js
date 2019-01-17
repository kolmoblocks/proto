module.exports = class KBWasm
{
    constructor(raw_wasm, args)
    {
        this.raw_wasm = raw_wasm;
        this.args = args;
    }

    Exec()
    {
        //console.log("KBwasm Exec is not implemented...");
        let result = new Array();
        result.push(1);
        result.push(2);
        result.push(3);
        return result;
    }
}