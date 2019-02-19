const http = require('http');

module.exports = class Cache
{
    constructor()
    {
        this.manifests = new Map();
        this.data = new Map();
    }

    get_manifest_by_doi(doi)
    {
        let result = {
            status: "Not found",
            data: null
        };

        let manifest = this.manifests.get(doi);

        if ( manifest )
        {
            result.status = "ok";
            result.data = manifest;
        }

        return result;
    }

    set_manifest_by_doi(manifest, doi)
    {
        this.manifests.set(doi, manifest);
    }

    get_data_by_doi(doi)
    {
        let result = {
            status: "Not found",
            data: null
        };

        let data = this.data.get(doi);

        if ( data )
        {
            result.status = "ok";
            result.data = data;
        }

        return result;
    }

    set_data_by_doi(data, doi)
    {
        this.data.set(doi, data);
    }
}