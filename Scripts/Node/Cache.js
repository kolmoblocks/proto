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
            manifest: null
        };

        let manifest = this.manifests.get(doi);

        if ( manifest )
        {
            result.status = "ok";
            result.manifest = manifest;
        }

        return result;
    }

    set_manifest_by_doi(manifest, doi)
    {
        this.manifests.set(doi, manifest);
    }
}