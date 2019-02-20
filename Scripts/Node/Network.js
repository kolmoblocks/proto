const Server = require('.//Server.js')
const Cache = require('.//Cache.js')
const Common = require('.//Common.js')

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

    async search_manifest(manifest)
    {
        let result = {
            status: "Not found",
            source: null,
            data: null
        };

        let dois = manifest.get_doi();

        if ( 0 == dois.data.length )
        {
            result.status = "Manifest has no doi";
            return result;
        }

        if ( this.DedicatedServer )
        {
            for ( let doi in dois.data )
            {
                let search_result = await this.search_manifest_by_doi(dois.data[doi]);

                if ( "ok" == search_result.status )
                {
                    result.status = "ok";
                    result.source = search_result.source;
                    result.data = search_result.data;

                    return result;
                }
            }
        }

        return result;
    }

    async search_manifest_by_doi(doi)
    {
        let result = {
            status: "",
            source: null,
            data: null
        };

        if ( this.DedicatedServer )
        {
            let manifest = this.Cache.get_manifest_by_doi(doi);

            if ( "ok" == manifest.status )
            {
                result.status = "ok";
                result.source = "Cache";
                result.data = manifest.data;
            }
            else
            {
                let json_manifest = await this.DedicatedServer.get_manifest_by_doi(doi);

                if ( "ok" == json_manifest.status )
                {
                    try
                    {
                        let manifest = new Common.Manifest(json_manifest.data);

                        result.status = "ok";
                        result.source = "Network";
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
            source: null,
            data: null
        };

        let raw_value = manifest.has_raw_value();

        if ( "ok" == raw_value.status )
        {
            result.status = "ok";
            result.data = raw_value.data;
            result.source = "Raw value";
            return result;
        }

        let dois = manifest.get_doi();

        if ( 0 == dois.data.length )
        {
            result.status = "Manifest has no doi";
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
                    result.source = "Cache";
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
                    result.source = "Network";
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