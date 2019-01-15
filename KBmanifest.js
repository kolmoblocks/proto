module.exports = class manifest 
{
    
    constructor(guid) {
        this.guid = guid
    }

    Init(data_manifest)
    {
        try {
            this.manifest = JSON.parse(data_manifest);
        } catch (error) {
            console.error(error.sta);
            return false;
        }

        // Check mandatory properties for manifest
        if ( !this.HasMandatoryProperty(this.manifest, "type") ) return false;
        if ( !this.HasMandatoryProperty(this.manifest, "filename") ) return false;
        if ( !this.HasMandatoryProperty(this.manifest, "created") ) return false;
        if ( !this.HasMandatoryProperty(this.manifest, "author") ) return false;
        if ( !this.HasMandatoryProperty(this.manifest, "size") ) return false;
        if ( !this.HasMandatoryProperty(this.manifest, "description") ) return false;
        if ( !this.HasMandatoryProperty(this.manifest, "hash algorithm") ) return false;

        if ( this.manifest.hasOwnProperty("recipies") )
        {
            for ( var recept_name in this.manifest.recipies )
            {
                let recept = this.manifest.recipies[recept_name];

                // each recipie must have a wasm propertie
                if ( !this.HasMandatoryProperty(recept, "wasm") ) return false;

                if ( 1 == Object.entries(recept).length ){
                    console.error("Each recipie must contain more then one propertie");
                    return false;
                }

                this.hasRecipies = true;
            }
        }
        
        return true;
    }

    HasMandatoryProperty(obj, prop_name)
    {
        if ( !obj.hasOwnProperty(prop_name) ){
            console.error("Manifest does't contain mandatory property - '" + prop_name + "'");
            return false;
        }
        return true;
    }

    HasRecipies() {
        return this.hasRecipies;
    }

    GetGuid() {
        return this.guid;
    }

    GetRecipies() 
    {
        let result = new Array();

        for ( var recept_name in this.manifest.recipies )
        {
            let recept = this.manifest.recipies[recept_name];
            recept["_name_"] = recept_name;
            result.push(recept);
        }

        return result;

    }
}