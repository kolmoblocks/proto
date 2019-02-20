module.exports = class Wasm
{
    constructor(raw_wasm, args)
    {
        this.raw_wasm = raw_wasm;
        this.args = args;
    }

    async exec()
    {
        let result = {
            status: "",
            data: []
        };

        try 
        {
            var wasmModule = await new WebAssembly.compile(this.raw_wasm);

            var wasmInstance = await new WebAssembly.instantiate(wasmModule, []);

            // fill args
            for ( var arg in this.args )
            {
                // check argument for null
                if ( null == this.args[arg] )
                {
                    result.status = this.create_error("Wrong usage, one of arguments is empty");
                    return result;
                }

                // let findout argument index by name
                let arg_index = 0;
                {
                    if ( !this.args[arg].hasOwnProperty("ArgName") )
                    {
                        result.status = this.create_error("Wrong usage, one of arguments has no 'ArgName' property");
                        return result;
                    }

                    let arg_name_buffer = new Uint8Array(Buffer.from(this.args[arg]["ArgName"]));
                    
                    var size = arg_name_buffer.length;

                    var pointer = wasmInstance.exports._set_arg_name(arg, arg_name_buffer.length);

                    if ( 0 != pointer )
                    {
                        var pWasmData = new Uint8ClampedArray(wasmInstance.exports.memory.buffer, pointer, size);

                        for (var i = 0; i < pWasmData.length; i++) {
                            pWasmData[i] = arg_name_buffer[i];
                        }

                        arg_index = wasmInstance.exports._get_arg_index(arg);

                        if ( 0 == arg_index )
                        {
                            result.status = this.create_last_error(wasmInstance);
                            return result;
                        }
                    }
                    else
                    {
                        result.status = this.create_last_error(wasmInstance);
                        return result;
                    }
                }

                // set arg data to Wasm
                {
                    var size = this.args[arg].length;

                    var pointer = wasmInstance.exports._set_arg(arg_index, size);

                    if ( 0 != pointer )
                    {
                        var pWasmData = new Uint8ClampedArray(wasmInstance.exports.memory.buffer, pointer, size);

                        for (var i = 0; i < pWasmData.length; i++) {
                            pWasmData[i] = this.args[arg][i];
                        }
                    }
                    else
                    {
                        result.status = this.create_last_error(wasmInstance);
                        return result;
                    }
                }
            }

            // exec alg in wasm
            if ( wasmInstance.exports._exec() )
            {
                // get result
                var size = wasmInstance.exports._get_result_size();

                var pointer = wasmInstance.exports._get_result();

                if ( 0 != pointer )
                {   
                    let result_data = new Array();

                    var pResultData = new Uint8ClampedArray(wasmInstance.exports.memory.buffer, pointer, size);
                    
                    for (var i = 0; i < pResultData.length; i++) {
                        result_data.push(pResultData[i]);
                    }

                    // TODO:
                    // result["MIME"] = wasmInstance.exports._get_result_type();

                    result.status = "ok";
                    result.data = result_data;
                }
                else
                    result.status = this.create_last_error(wasmInstance);
            }
            else
                result.status = this.create_last_error(wasmInstance);

        } 
        catch(error) 
        {
            result.status = this.create_error("Exception while Exec: " + error);
        }

        return result;
    }

    create_error(text)
    {
        return new Uint8Array(Buffer.from(JSON.stringify({ "Error" : "KBwasm->Exec", "Text" : text })));
    }

    create_last_error(wasmInstance)
    {
        let error = new Array();

        let pointer = wasmInstance.exports._get_last_error();

        let size = wasmInstance.exports._get_last_error_size();

        var pWasmData = new Uint8ClampedArray(wasmInstance.exports.memory.buffer, pointer, size);

        for (var i = 0; i < pWasmData.length; i++) {
            error.push(pWasmData[i]);
        }

        return this.create_error(this.stringFromUTF8Array(error));
    }

    stringFromUTF8Array(data)
    {
        const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
        var count = data.length;
        var str = "";

        for (var index = 0;index < count;)
        {
            var ch = data[index++];
            if (ch & 0x80)
            {
            var extra = extraByteMap[(ch >> 3) & 0x07];
            if (!(ch & 0x40) || !extra || ((index + extra) > count))
                return null;
            
            ch = ch & (0x3F >> extra);
            for (;extra > 0;extra -= 1)
            {
                var chx = data[index++];
                if ((chx & 0xC0) != 0x80)
                return null;
                
                ch = (ch << 6) | (chx & 0x3F);
            }
            }
            
            str += String.fromCharCode(ch);
        }

        return str;
    }
}