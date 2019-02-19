
module.exports = class Manifest
{

    constructor(json)
    {
        this.json = json;
        
        this.Validate();
    }

    Validate()
    {
        if ( !this.json.hasOwnProperty("MIME") )
            throw "Not found required property MIME";
    }
}