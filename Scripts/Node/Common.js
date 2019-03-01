const Wasm = require('.//Wasm.js')

class Formula
{
    constructor(json, manifest)
    {
        this.json = json;
        this.manifest = manifest;

        this.wasm = null;
        this.jsglue = null;
        this.parameters = [];

        // validate actor
        if ( !this.json.hasOwnProperty("actor") )
            throw "Not found required property actor";
        
        if( !this.json.actor.hasOwnProperty("wasm") )
            throw "Not found required property actor.wasm";
        
        this.wasm = new Manifest(this.json.actor.wasm);
        this.wasm.ArgName = "actor.wasm";

        if( this.json.actor.hasOwnProperty("jsglue") )
        {
            this.jsglue = new Manifest(this.json.actor.jsglue);
            this.jsglue.ArgName = "actor.jsglue";
        }

        // validate parameters
        if ( !this.json.hasOwnProperty("parameters") )
            throw "Not found required property parameters";

        for ( var parameter in this.json.parameters )
        {   
            let param = new Manifest(this.json.parameters[parameter]);

            param.ArgName = parameter;

            this.parameters.push(param);
        };    
    }

    get_dependencies()
    {
        let result = {
            status: "ok",
            data: []
        };

        result.data.push(this.wasm);

        if ( this.jsglue )
            result.data.push(this.jsglue);

        this.parameters.forEach(parameter => {
            result.data.push(parameter);
        });

        return result;
    }

    async eval(dependencies_data)
    {
        let result = {
            status: "",
            data: []
        };

        let wasm = dependencies_data.get("actor.wasm");

        if ( null == wasm )
        {
            result.status = "Evaluation failed, has no actor.wasm data";
            return result;
        }

        let jsglue = null;

        if ( this.jsglue )
        {
            jsglue = dependencies_data.get("actor.jsglue");

            if ( null == jsglue )
            {
                result.status = "Evaluation failed, has no actor.jsglue data";
                return result;
            }   
        }

        let args = [];
        
        for ( var parameter in this.parameters )
        {
            let ArgName = this.parameters[parameter].ArgName;
            
            let arg = dependencies_data.get(ArgName);
         
            if ( null == arg )
            {
                result.status = "Evaluation failed, has no " + ArgName + " data";
                return result;
            }
            
            arg.ArgName = ArgName;

            args.push(arg);
        }

        var wasm_wrapper = new Wasm(wasm, jsglue);

        result = await wasm_wrapper.exec(args);

        if ( "ok" == result.status )
        {
            if ( this.manifest )
            {
                let mime = this.manifest.get_mime();
                
                if ( "ok" == mime.status )
                    result.data.MIME = mime.data;
            }
        }

        return result;
    }
}

class Manifest
{
    constructor(json)
    {
        this.json = json;
        
        // TODO: Implement validation RULES:
        // 1. has no doi -> HAVE TO own raw value or at least one formula
        // 2. has no MIME -> HAVE TO own doi or at least one formula
    }

    get_mime()
    {
        let result = {
            status: "Has no MIME",
            data: null
        };

        if ( this.json.hasOwnProperty("MIME") )
        {
            result.status = "ok";
            result.data = this.json.MIME;
        }

        return result;
    }

    get_raw_value()
    {
        let result = {
            status: "Has no raw",
            data: []
        };

        if ( this.json.hasOwnProperty("raw") )
        {
            result.status = "ok";

            result.data = new Uint8Array(Buffer.from(this.json.raw));

            if ( this.json.hasOwnProperty("MIME") )
                result.data["MIME"] = this.json.MIME;
        }

        return result;
    }

    get_doi()
    {
        let result = {
            status: "ok",
            data: []
        };

        if ( this.json.hasOwnProperty("doi") )
        {
            for ( var doi in this.json.doi )
                result.data.push(this.json.doi[doi]);
        }

        return result;
    }

    get_formulas()
    {
        let result = {
            status: "",
            data: []
        };

        if ( this.json.hasOwnProperty("formulas") )
        {
            this.json.formulas.forEach(json_formula => {

                try
                {
                    result.data.push( new Formula(json_formula, this) );
                }
                catch(error)
                {
                    result.status += "Error creating formula (" + error + ") ";
                }

            });
        }

        if ( "" == result.status )
            result.status = "ok";

        return result;
    }
}

module.exports = {
    Manifest : Manifest,
    Formula : Formula
}