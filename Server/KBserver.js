var fs = require("fs");

const isBrowser = this.window === this;

module.exports = class KBserver
{
    constructor(server_data_path){
        if ( null == server_data_path )
            this.server_data_path = process.cwd() + "/Server/";
        else
            this.server_data_path = server_data_path;
    }

    GetDataExpressionByCID(cid)
    {
        if ( !isBrowser ) 
        {            
            try 
            {  
                let jsondata = JSON.parse(fs.readFileSync(this.server_data_path + "db.json"));

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
        
        return null;

    }

    GetRawDataByRef(ref)
    {
        if ( !isBrowser ) 
        {
            
            try 
            {  
                let data = fs.readFileSync(this.server_data_path + "files//" + ref);
                return new Uint8Array(data);
            } 
            catch(error) 
            {
                console.log('Error:', error.stack);
            }

        }
        
        return null;
    }
}