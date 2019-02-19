class Formula
{
    constructor(json)
    {
        this.json = json;
        this.wasm = null;
        this.JSglue = null;
        this.parameters = [];

        // validate actor
        if ( !this.json.hasOwnProperty("actor") )
            throw "Not found required property actor";
        
        if( !this.json.actor.hasOwnProperty("wasm") )
            throw "Not found required property actor.wasm";
        
        this.wasm = new Manifest(this.json.actor.wasm);

        if( this.json.actor.hasOwnProperty("JSglue") )
            this.jsglue = new Manifest(this.json.actor.JSglue);


        // validate parameters
        if ( !this.json.hasOwnProperty("parameters") )
            throw "Not found required property parameters";

        for ( var parameter in this.json.parameters )
        {   
            let param = new Manifest(this.json.parameters[parameter]);

            param["ArgName"] = parameter;

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
                    result.data.push( new Formula(json_formula) );
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