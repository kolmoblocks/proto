const KBserver = require('../Server/KBserver.js')

module.exports = class KBcache
{

    constructor(){
        this.KBserver = new KBserver();
    }

    GetDataByCID(cid)
    {
        // todo: check local cache for existing requested information
        return this.KBserver.GetDataByCID(cid);
    }

    GetDataByRef(ref)
    {
        // todo: check local cache for existing requested information
        return this.KBserver.GetDataByRef(ref);
    }
}