class KBcache
{
    constructor(hostname, port)
    {
        this.hostname = hostname;
        this.port = port;
        this.ref_cache = new Map();
        this.cid_cache = new Map();
    }

    async requestREF(url)
    {
        let response = await fetch(url);
        let raw_data = await response.arrayBuffer();
        return raw_data;
    }

    async requestCID(url)
    {
        let response = await fetch(url);
        let json_data = await response.json();
        return JSON.stringify(json_data);;
    }

    async GetDataExpressionByCID(cid)
    {
        let cached_data = this.cid_cache.get(cid);

        if ( null == cached_data )
        {
            let url = 'http://' + this.hostname + ':' + this.port + '/CID=' + cid;

            let server_data = JSON.parse(await this.requestCID(url));
            
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

            let server_data = new Uint8Array(await this.requestREF(url));

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