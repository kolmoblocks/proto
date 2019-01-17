const KBserver = require('..//Server//KBserver.js')

module.exports = class KBcache
{

    constructor(){
        this.KBserver = new KBserver();
    }

    GetDataExpressionByCID(cid)
    {
        // todo: check local cache for existing requested information
        return this.KBserver.GetDataExpressionByCID(cid);
    }

    GetRawDataByRef(ref)
    {
        // todo: check local cache for existing requested information
        return this.KBserver.GetRawDataByRef(ref);
    }
}