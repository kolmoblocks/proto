module.exports = class KBWasm
{
    constructor(raw_wasm, args)
    {
        this.raw_wasm = raw_wasm;
        this.args = args;
    }

    Exec()
    {
        let r = WebAssembly.compile(this.raw_wasm);
        //console.log("KBwasm Exec is not implemented...");
        let result = new Array();
        result.push(1);
        result.push(2);
        result.push(3);

        result["MIME"] = "utf8/text";
        result["size"] = 3;

        return result;
    }
}