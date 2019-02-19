var fs = require("fs");

module.exports = class KBserver
{
    constructor(server_data_path){
        if ( null == server_data_path )
            this.server_data_path = process.cwd() + "/Server/";
        else
            this.server_data_path = server_data_path;
    }

    GetManifestByDOI(doi)
    {
        try 
        {  
            let jsondata = JSON.parse(fs.readFileSync(this.server_data_path + "manifests.json"));

            for ( var i in jsondata )
            {
                let data = jsondata[i];

                if ( data.hasOwnProperty("doi") )
                {
                    let data_doi = data["doi"];
                    
                    for ( var j in data_doi )
                        if ( data_doi[j] == doi ) return data;
                }
            }
        } 
        catch(error) 
        {
            console.log('Error getting manifest by DOI:', error.stack);
        }
        
        return null;
    }

    GetDataByDoi(doi)
    {  
        try 
        {  
            let jsondata = JSON.parse(fs.readFileSync(this.server_data_path + "data chunks.json"));

            for ( var i in jsondata )
            {
                let data = jsondata[i];

                if ( data.hasOwnProperty("doi") )
                {
                    let data_doi = data["doi"];
                    
                    for ( var j in data_doi )
                    {
                        if ( data_doi[j] == doi )
                        {
                            if ( data.hasOwnProperty("ref") )
                            {
                                let file_data = fs.readFileSync(this.server_data_path + "files//" + data["ref"]);

                                var bin_data = new Uint8Array(file_data);

                                if ( data.hasOwnProperty("MIME") )
                                    bin_data['MIME'] = data["MIME"];

                                return bin_data;
                            }
                        }
                    }
                }
            }
        } 
        catch(error) 
        {
            console.log('Error getting data by DOI:', error.stack);
        }
        
        return null;
    }
}