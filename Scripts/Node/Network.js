const Server = require('.//Server.js')
const Cache = require('.//Cache.js')
const Manifest = require('.//Manifest.js')

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
            manifest: null
        };

        if ( this.DedicatedServer )
        {
            let manifest = this.Cache.get_manifest_by_doi(doi);

            if ( "ok" == manifest.status )
            {
                result.status = "ok";
                result.from_cache = true;
                result.manifest = manifest.manifest;
            }
            else
            {
                let json_manifest = await this.DedicatedServer.get_manifest_by_doi(doi);

                if ( "ok" == json_manifest.status )
                {
                    try
                    {
                        let manifest = new Manifest(json_manifest.manifest);

                        result.status = "ok";
                        result.from_cache = false;
                        result.manifest = manifest;

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
}