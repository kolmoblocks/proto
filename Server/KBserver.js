var fs = require("fs");

const isBrowser = this.window === this;

module.exports = class KBserver
{

    constructor(){
    }

    GetDataByCID(cid)
    {
        if ( !isBrowser ) 
        {            
            try 
            {  
                let jsondata = JSON.parse(fs.readFileSync(process.cwd() + "\\Server\\db.json"));

                for ( var i in jsondata )
                {
                    let data = jsondata[i];

                    if ( data.hasOwnProperty("cids") )
                    {
                        let data_cids = data["cids"];
                        for ( var j in data_cids )
                            if ( data_cids[j] == cid ) return data;
                    }
                }
            } 
            catch(error) 
            {
                console.log('Error getting data by CID:', error.stack);
            }
        }
        else 
        {
            
            // search in local cache

            // if no data in cache - load from....

            console.log('Not implemented getting data by CID');
        }
        
        return null;

    }

    GetDataByRef(ref)
    {
        if ( !isBrowser ) 
        {
            
            try 
            {  
                let data = fs.readFileSync(process.cwd() + "\\Server\\files\\" + ref);
                return new Uint8Array(data);
            } 
            catch(error) 
            {
                console.log('Error:', error.stack);
            }

        }
        else 
        {
            
            // search in local cache

            // if no data in cache - load from....

            console.log('Not implemented');
        }
        
        return null;
    }
}