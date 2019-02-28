module.exports = class Wasm
{
    constructor(raw_wasm, jsglue)
    {
        this.raw_wasm = raw_wasm;
        this.jsglue = jsglue;
        this.wasm_instance = null;
    }

    async init()
    {
        let result = {
            status: "ok"
        };

        try
        {
            if ( null == this.wasm_instance )
            {
                var wasmModule = await new WebAssembly.compile(this.raw_wasm);

                this.wasm_instance = await new WebAssembly.instantiate(wasmModule, []);
            }
        }
        catch(error)
        {
            result.status = this.create_error("Exception while init: " + error);
        }

        return result;
    }

    async exec(args)
    {
        let result = {
            status: "",
            data: []
        };

        try 
        {
            let init_res = await this.init();

            if ( "ok" == init_res.status )
            {
                // fill args
                for ( var arg in args )
                {
                    // check argument for null
                    if ( null == args[arg] )
                    {
                        result.status = this.create_error("Wrong usage, one of arguments is empty");
                        return result;
                    }

                    // lets findout argument index by name
                    let arg_index = 0;
                    {
                        if ( !args[arg].hasOwnProperty("ArgName") )
                        {
                            result.status = this.create_error("Wrong usage, one of arguments has no 'ArgName' property");
                            return result;
                        }

                        let arg_name_buffer = new Uint8Array(Buffer.from(args[arg]["ArgName"]));
                        
                        var size = arg_name_buffer.length;

                        var pointer = this.wasm_instance.exports._set_arg_name(arg, arg_name_buffer.length);

                        if ( 0 != pointer )
                        {
                            var pWasmData = new Uint8ClampedArray(this.wasm_instance.exports.memory.buffer, pointer, size);

                            for (var i = 0; i < pWasmData.length; i++) {
                                pWasmData[i] = arg_name_buffer[i];
                            }

                            arg_index = this.wasm_instance.exports._get_arg_index(arg);

                            if ( 0 == arg_index )
                            {
                                result.status = this.create_last_error();
                                return result;
                            }
                        }
                        else
                        {
                            result.status = this.create_last_error();
                            return result;
                        }
                    }

                    // set arg data to Wasm
                    {
                        var size = args[arg].length;

                        var pointer = this.wasm_instance.exports._set_arg(arg_index, size);

                        if ( 0 != pointer )
                        {
                            var pWasmData = new Uint8ClampedArray(this.wasm_instance.exports.memory.buffer, pointer, size);

                            for (var i = 0; i < pWasmData.length; i++) {
                                pWasmData[i] = args[arg][i];
                            }
                        }
                        else
                        {
                            result.status = this.create_last_error();
                            return result;
                        }
                    }
                }

                // exec alg in wasm
                if ( this.wasm_instance.exports._exec() )
                {
                    // get result
                    var size = this.wasm_instance.exports._get_result_size();

                    var pointer = this.wasm_instance.exports._get_result();

                    if ( 0 != pointer )
                    {   
                        let result_data = new Array();

                        var pResultData = new Uint8ClampedArray(this.wasm_instance.exports.memory.buffer, pointer, size);
                        
                        for (var i = 0; i < pResultData.length; i++) {
                            result_data.push(pResultData[i]);
                        }

                        // TODO:
                        // result["MIME"] = this.wasm_instance.exports._get_result_type();

                        result.status = "ok";
                        result.data = result_data;
                    }
                    else
                        result.status = this.create_last_error();
                }
                else
                    result.status = this.create_last_error();
            }
            else
                result.status = this.create_error("Init error: " + init_res.status);
        } 
        catch(error) 
        {
            result.status = this.create_error("Exception while exec: " + error);
        }

        return result;
    }

    create_error(text)
    {
        return new Uint8Array(Buffer.from(JSON.stringify({ "Error" : "Wasm->exec", "Text" : text })));
    }

    create_last_error()
    {
        let error = new Array();

        let pointer = this.wasm_instance.exports._get_last_error();

        let size = this.wasm_instance.exports._get_last_error_size();

        var pWasmData = new Uint8ClampedArray(this.wasm_instance.exports.memory.buffer, pointer, size);

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