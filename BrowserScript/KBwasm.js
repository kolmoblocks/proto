module.exports = class KBWasm
{
    constructor(raw_wasm, args)
    {
        this.raw_wasm = raw_wasm;
        this.args = args;
    }

    async Exec()
    {
        let result = new Array();

        try {

            var wasmModule = await new WebAssembly.Module(this.raw_wasm);

            var wasmInstance = await new WebAssembly.Instance(wasmModule, []);

            // fill args
            for ( var arg in this.args )
            {
                // TODO:
                // var arg_index = wasmInstance.exports.arg_index_by_name(args[arg]["ArgName"]);
                var arg_index = arg;

                // next string for testing WebAssembly only !
                if ( null != this.args[arg]["ArgIndex"] ) 
                    arg_index = this.args[arg]["ArgIndex"]
                
                var size = this.args[arg].length;

                var pointer = wasmInstance.exports.get_arg(arg_index, size);

                var pWasmData = new Uint8ClampedArray(wasmInstance.exports.memory.buffer, pointer, size);

                for (var i = 0; i < pWasmData.length; i++) {
                    pWasmData[i] = this.args[arg][i];
                }
            }

            // exec alg in wasm
            if ( wasmInstance.exports.exec() )
            {
                // get result
                var size = wasmInstance.exports.get_result_size();

                var pointer = wasmInstance.exports.get_result();
                
                var pResultData = new Uint8ClampedArray(wasmInstance.exports.memory.buffer, pointer, size);
                
                for (var i = 0; i < pResultData.length; i++) {
                    result.push(pResultData[i]);
                }

                // TODO:
                // result["MIME"] = wasmInstance.exports.get_result_type();
            }
            else
            {
                console.log("Assembly return false for exec");

                return null;
            }

        } catch(error) {
            
            console.log("Error while assembly exec ",error);

            return null;
            
        }

        return result;
    }
}