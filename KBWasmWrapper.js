module.exports = class KBWasmWrapper 
{
    constructor(raw_wasm, args)
    {
        this.raw_wasm = raw_wasm;
        this.args = args;
    }

    Exec()
    {
        console.log("KBWasmWrapper Exec is not implemented...");
        return null;
    }
}