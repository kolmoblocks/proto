class KBcache
{
    constructor(hostname, port)
    {
        this.hostname = hostname;
        this.port = port;
        this.ref_cache = new Map();
        this.cid_cache = new Map();
    }

    async requestDataFromServer(url)
    {
        //let resp = await fetch(url);
        //console.log(url + "--->>>" + resp);
        //return resp;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
        
        /*return new Promise((resolve, reject) => {
            http.get(url, (res) => {
                let data = [];
                res.on('end', () => resolve(Buffer.concat(data)));
                res.on('data', (chunk) => data.push(chunk));
            }).on('error', e => reject(e));
        });*/
    }

    async GetDataExpressionByCID(cid)
    {
        let cached_data = this.cid_cache.get(cid);

        if ( null == cached_data )
        {
            let url = 'http://' + this.hostname + ':' + this.port + '/CID=' + cid;

            let server_data = JSON.parse(await this.requestDataFromServer(url));
            
            if ( null != server_data )
            {
                this.cid_cache.set(cid, server_data);

                return server_data;
            }
        }

        return cached_data;
    }

    async GetRawDataByRef(ref)
    {
        let cached_data = this.ref_cache.get(ref);

        if ( null == cached_data )
        {
            let url = 'http://' + this.hostname + ':' + this.port + '/REF=' + ref;

            let server_data = new Uint8Array(await this.requestDataFromServer(url));

            if ( null != server_data )
            {
                this.ref_cache.set(ref, server_data);
                
                return server_data;
            }
        }

        return cached_data;
    }

    DataExpressionInCacheByCID(cid)
    {
        let cached_data = this.cid_cache.get(cid);

        if ( null == cached_data )
            return false;
        else
            return true;
    }

    RawDataInCacheByRef(ref)
    {
        let cached_data = this.ref_cache.get(ref);

        if ( null == cached_data )
            return false;
        else
            return true;
    }

}