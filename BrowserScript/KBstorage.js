import KBcache from './KBcache'

import  KBwasm from './KBwasm'

export default class KBstorage
{
    constructor(server_data_path)
    {
        this.cache = new KBcache(server_data_path);
    }

    async GetData(data_expression)
    {
        console.log(data_expression);
        try {
            return Promise.resolve(this.ExecExpression(data_expression));
        }catch(error){
            console.log('Error parsing expression to JSON:\n', error);
        }

        return Promise.resolve(null);
    }

    async ExecExpression(expression)
    {
        if ( expression.hasOwnProperty("cid") )
            return await this._cid(expression);

        if ( expression.hasOwnProperty("exec") )
            return await this._exec(expression);

        if ( expression.hasOwnProperty("ref") )
            return await this._ref(expression);

        if ( expression.hasOwnProperty("raw") )
            return await this._raw(expression);

        if ( expression.hasOwnProperty("seq") )
            return await this._seq(expression);
        
        console.log("Not implemented for this type of expression");
        console.log(expression);

        return null;
    }

    async _cid(expression)
    {
        let data_by_cid = this.cache.GetDataExpressionByCID(expression["cid"]);

        if ( null == data_by_cid )
        {
            console.log("Empty data expressions by cid for " + expression["cid"]);
            return null;
        }

        let data_expressions = this.ExtractDataExpressions(data_by_cid);

        if ( 0 == data_expressions.length )
        {
            console.log("Empty expressions list for " + expression["cid"]);
            return null;
        }

        let exp_to_exec = this.ChooseExpression(data_expressions);
        
        let data = await this.ExecExpression(exp_to_exec);
        
        return data;
    }

    async _exec(expression)
    {
        let exec = expression["exec"]

        if ( !exec.hasOwnProperty("wasm") )
        {
            console.log("Expression exec does't contain wasm property");
            return null;
        }
        
        let wasm = await this.ExecExpression(exec["wasm"]);
        if ( null == wasm )
        {
            console.log("Expression exec has empty wasm");
            return null;
        }

        let args = new Array();

        for ( var index in exec )
        {
            if ( "wasm" == index )
                continue;
            
            let arg = await this.ExecExpression(exec[index]);
            if ( null == arg )
            {
                console.log("Expression exec has empty arg");
                return null;
            }

            arg["ArgName"] = index;

            args.push(arg);
        }

        let result = await new KBwasm(wasm, args).Exec();

        if ( null == result )
        {
            console.log("Wasm execution result is empty");
            return null;
        }

        if ( null == result["MIME"] )
            result["MIME"] = expression["MIME"];
        
        if ( null == result["size"] )
            result["size"] = expression["size"];

        return result;
    }

    async _ref(expression)
    {
        let ref = expression["ref"];

        let result = this.cache.GetRawDataByRef(ref);

        if ( null == result )
        {
            console.log("Expression ref is empty");
            return null;
        }

        result["MIME"] = expression["MIME"];
        result["size"] = expression["size"];

        return result;
    }

    async _raw(expression)
    {
        let raw = expression["raw"];

        let utf8str = String(raw); // <-- utf8 string
    
        var result = new Array();

        for ( var i=0; i < utf8str.length; i++ ) {

            var charcode = utf8str.charCodeAt(i);
            
            result.push( charcode ); // ????
        }

        return result;
    }

    async _seq(expression)
    {
        let result = new Array();
        let seq = expression["seq"];

        let MIME = expression["MIME"];
        let size = expression["size"];

        for ( var index in seq )
        {
            let expression = seq[index];
            
            let data_block = await this.ExecExpression(expression);

            if ( null == data_block )
            {
                console.log("Empty data in sequences");
                return null;
            }

            for ( var i in data_block )
                result.push(data_block[i]);
        }

        result["MIME"] = MIME;
        result["size"] = size;

        return result;
    }

    ExtractDataExpressions(data_by_cid)
    {
        let result = new Array();
        let MIME = data_by_cid["MIME"];
        let size = data_by_cid["size"];

        for ( var index in data_by_cid )
        {
            if (( "cids" == index ) || ( "MIME" == index ) ||( "size" == index ))
                continue;
            
            let expression = data_by_cid[index];

            expression["MIME"] = MIME;
            expression["size"] = size;

            if ( expression.hasOwnProperty("exec") )
            {
                result.push(expression);
                continue;
            }

            if ( expression.hasOwnProperty("ref") )
            {
                result.push(expression);
                continue;
            }

            if ( expression.hasOwnProperty("raw") )
            {
                result.push(expression);
                continue;
            }

            if ( expression.hasOwnProperty("cid") )
            {
                result.push(expression);
                continue;
            }

            if ( expression.hasOwnProperty("seq") )
            {
                result.push(expression);
                continue;
            }
        }
        
        return result;
    }

    ChooseExpression(data_expressions)
    {
        // now it's always first
        return data_expressions[0];
    }

    GetDataExpressionByCID(cid) {
        return this.cache.GetDataExpressionByCID(cid);
    }

    ParseExpression(exp)
    {
        try{
            let expression = JSON.parse(exp);

            let result = new Object();

            if ( expression.hasOwnProperty("cid") )
            {
                let data_by_cid = this.cache.GetDataExpressionByCID(expression["cid"]);
                let data_expressions = this.ExtractDataExpressions(data_by_cid);
                Object.keys(data_by_cid).forEach(function(key) {
                    if (key.substr(0,15) != "data_expression") {
                        result[key] = data_by_cid[key];
                        console.log(key);
                    }
                    console.log(key);
                })
                console.log(result);
                result['data_expressions'] = data_expressions;
            }

            if ( expression.hasOwnProperty("exec") )
            {
                let exec = expression["exec"];
                for ( var i in exec )
                    result.push(exec[i]);
            }

            if ( expression.hasOwnProperty("ref") )
            {
                //let ref = expression["ref"];
                //result.push(ref);
            }

            if ( expression.hasOwnProperty("raw") )
            {
                let raw = expression["raw"];
                result.push(raw);
            }

            if ( expression.hasOwnProperty("seq") )
            {
                let seq = expression["seq"];
                for ( var i in seq )
                    result.push(seq[i]);
            }

            return result;

        }catch(error){
            console.log(error);
            return null;
        }

    }

    ExpressionInCache(expression)
    {
        try{

            if ( expression.hasOwnProperty("ref") )
                return this.cache.RawDataInCacheByRef(expression["ref"]);

            if ( expression.hasOwnProperty("cid") )
                return this.cache.DataExpressionInCacheByCID(expression["cid"]);
                
        }catch(error){
            return false;
        }

        return false;
    }

}