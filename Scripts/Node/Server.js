const https = require('https');
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
            data: null
        };
    
        let url = this.address + '/search?doi=' + doi;

        try
        {
            let response = await this.request_server(url);

            try
            {
                result.data = JSON.parse(response);

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
        let result = {
            status: "",
            data: null
        };
    
        let url = this.address + '/raw/' + doi;

        try
        {
            result.data = await this.request_server(url);

            result.status = "ok";
        }
        catch(error)
        {
            result.status = "Error requesting server (" + error + ")";
        }

        return result;
    }

    async request_server(url)
    {
        if (url.startsWith("https:"))
        {
            return new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    let data = [];
                    res.on('end', () => resolve(Buffer.concat(data)));
                    res.on('data', (chunk) => data.push(chunk));
                }).on('error', e => reject(e));
            });
        }
        else
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
}