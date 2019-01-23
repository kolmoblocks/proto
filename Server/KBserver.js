import fs from 'fs';
import path from 'path';

const isBrowser = false;

export default class KBserver
{

    constructor(){
    }

    GetDataExpressionByCID(cid)
    {
        if ( !isBrowser ) 
        {            
            try 
            {  
                console.log(require(__dirname+"/db.json"));
                let jsondata = require(__dirname+"/db.json");

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
                console.log(error);
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
                let data = require(process.cwd() + "/Server/files/" + ref);
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