var fs = require("fs");

const isBrowser = this.window === this;

module.exports = class KBcache 
{

    constructor(){
    }

    GetFormulas(cid)
    {
        let result = null;

        if ( !isBrowser ) 
        {
            
            try 
            {  

                let data = fs.readFileSync(process.cwd() + "\\Data\\Matches\\data.json");

                let jsondata = JSON.parse(data);

                for ( var matches in jsondata )
                {
                    let match = jsondata[matches];
                    for ( var index in match )
                    {
                        let formula = match[index];
                        if ( formula.hasOwnProperty("cid") )
                        {
                            if ( cid == formula["cid"])
                            {
                                if ( null == result )
                                    result = new Array();

                                result.push(formula);
                            }
                        }
                    }
                }

                return result;

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

    GetDataByRef(ref)
    {
        if ( !isBrowser ) 
        {
            
            try 
            {  
                let data = fs.readFileSync(process.cwd() + "\\Data\\" + ref);
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