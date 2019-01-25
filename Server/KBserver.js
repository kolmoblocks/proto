const isBrowser = (typeof process === 'object' ? false : true);

export default class KBserver
{
    constructor(server_data_path){
        if ( null == server_data_path )
            this.server_data_path = process.cwd() + "/Server/";
        else
            this.server_data_path = server_data_path;
    }

    async GetDataExpressionByCID(cid)
    {

        try {
            let jsondata = {};
            if (isBrowser) {
                jsondata = await fetch(process.env.API_URL+'search?cid='+cid);
            }
            else {
                jsondata = require(__dirname+"/db.json");
            }

            if (jsondata == null) {
                console.log("Fetching messed up.")
            }
            else {
                for ( var i in jsondata )
                {
                    let data = jsondata[i];

                    if ( data.hasOwnProperty("cids") )
                    {
                        let data_cids = data["cids"];
                        for ( var j in data_cids )
                            if ( data_cids[j] == cid ) return Promise.resolve(data);
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        
        console.log("Requested cid not found in fetched object, or something else went wrong");
        return Promise.resolve(null);

    }

    async GetRawDataByRef(ref)
    {
        try {
            let data = null;
            if (isBrowser) {
                data = await fetch(process.env.API_URL + 'raw/' + ref);
            } else {
                data = require(__dirname + "/files/" + ref);
            }
            return Promise.resolve(new Uint8Array(data));
        } catch (error) {
            console.log(error);
        }
        
        console.log("Raw data is null. Something wrong happened.");
        return null;
    }
}