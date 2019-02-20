const Server = require('.//Server.js')
const Cache = require('.//Cache.js')
const Manifest = require('.//Common.js')

module.exports = class Network
{
    constructor(settings)
    {
        this.Cache = new Cache();

        if ( settings.hasOwnProperty("DedicatedServer") )
        {
            this.DedicatedServer = new Server(settings["DedicatedServer"]);

            return;
        }

        throw "Bad network settings";
    }

    async search_manifest(doi)
    {
        let result = {
            status: "",
            from_cache: null,
            data: null
        };

        if ( this.DedicatedServer )
        {
            let manifest = this.Cache.get_manifest_by_doi(doi);

            if ( "ok" == manifest.status )
            {
                result.status = "ok";
                result.from_cache = true;
                result.data = manifest.data;
            }
            else
            {
                let json_manifest = await this.DedicatedServer.get_manifest_by_doi(doi);

                if ( "ok" == json_manifest.status )
                {
                    try
                    {
                        let manifest = new Manifest.Manifest(json_manifest.data);

                        result.status = "ok";
                        result.from_cache = false;
                        result.data = manifest;

                        this.Cache.set_manifest_by_doi(manifest, doi);                        
                    }
                    catch(error)
                    {
                        result.status = "Not valid manifest (" + error + ")";
                    }
                }
                else
                {
                    result.status = json_manifest.status;
                }
            }
        }
        else
        {    
            result.status = "Not implimented";
        }

        return result;
    }

    async search_data(manifest)
    {
        let result = {
            status: "",
            from_cache: null,
            data: null
        };

        let raw_value = manifest.has_raw_value();

        if ( "ok" == raw_value.status )
        {
            result.status = "ok";
            result.data = raw_value.data;
            return result;
        }

        let dois = manifest.get_doi();

        if ( 0 == dois.data.length )
        {
            result.status = "ok";
            return result;
        }

        if ( this.DedicatedServer )
        {
            for ( let doi in dois.data )
            {
                let data = this.Cache.get_data_by_doi(dois.data[doi]);

                if ( "ok" == data.status )
                {
                    result.status = "ok";
                    result.from_cache = true;
                    result.data = data.data;

                    return result;
                }
            }

            for ( let doi in dois.data )
            {
                let server_data = await this.DedicatedServer.get_data_by_doi(dois.data[doi]);

                if ( "ok" == server_data.status )
                {
                    result.status = "ok";
                    result.from_cache = false;
                    result.data = server_data.data;

                    this.Cache.set_data_by_doi(server_data.data, dois.data[doi]);

                    return result;
                }
                else
                {
                    result.status = server_data.status;
                }
            }
        }
        else
        {    
            result.status = "Not implimented";
        }

        return result;
    }
}