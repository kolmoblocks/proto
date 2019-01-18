const KBserver = require('..//Server//KBserver.js')

module.exports = class KBcache
{

    constructor(){
        this.KBserver = new KBserver();
        this.ref_cache = new Map();
    }

    GetDataExpressionByCID(cid)
    {
        // todo: check local cache for existing requested information
        return this.KBserver.GetDataExpressionByCID(cid);
    }

    GetRawDataByRef(ref)
    {
        let cached_data = this.ref_cache.get(ref);

        if ( null == cached_data )
        {
            let server_data = this.KBserver.GetRawDataByRef(ref);
            if ( null != server_data )
            {
                this.ref_cache.set(ref, server_data);
                return server_data;
            }
        }

        return cached_data;
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