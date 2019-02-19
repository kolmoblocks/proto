const http = require('http');

module.exports = class Server
{
    constructor(address)
    {
        this.address = address;
    }

    async get_manifest_by_doi(doi)
    {
        let result = {
            status: "",
            manifest: null
        };
    
        let url = 'http://' + this.address + '/MANIFEST_BY_DOI=' + doi;

        try
        {
            let response = await this.request_server(url);

            try
            {
                result.manifest = JSON.parse(response);

                result.status = "ok";
            }
            catch(error)
            {
                result.status = "Error parsing request (" + error + ")";
            }

        }
        catch(error)
        {
            result.status = "Error requesting server (" + error + ")";
        }

        return result;
    }

    async get_data_by_doi(doi)
    {

    }

    async request_server(url)
    {
        return new Promise((resolve, reject) => {
            http.get(url, (res) => {
                let data = [];
                res.on('end', () => resolve(Buffer.concat(data)));
                res.on('data', (chunk) => data.push(chunk));
            }).on('error', e => reject(e));
        });
    }
}