var fs = require("fs");

const isBrowser = this.window === this;

module.exports = class KBcache 
{

    constructor(){
    }

    // Get data associated with guid
    // if like "guid.json" - KB manifest
    // if like "guid.wasm" - KB web assembly
    // if just "guid" - KB data
    Get(guid)
    {

        if ( !isBrowser ) {
            try {  
                // to do: search in local cache
                let data = fs.readFileSync(process.cwd() + "\\Data\\" + guid);
                // to do: set data to inner storage
                return data;
            } catch(error) {
                console.error('Error:', error.stack);
            }
        } else {
            
            // search in local cache

            // if no data in cache - load from....

            console.error('Not implemented');
        }
        
        return null;
    }

    // Check for presense in cache data with guid
    IsPresent(guid) 
    {
        // search in local cache

        return null;
    }
}