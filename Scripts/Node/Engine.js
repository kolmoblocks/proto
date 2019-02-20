const Network = require('.//Network.js')
const Cache = require('.//Cache.js')

module.exports = class Engine
{
    constructor(settings)
    {
        this.Cache = new Cache();

        if ( settings.hasOwnProperty("Network") )
        {
            this.Network = new Network(settings["Network"], this.Cache);
            return;
        }
        
        throw "Bad engine settings";
    }

    network()
    {
        return this.Network;
    }

    clear_cache()
    {
        this.Cache.clear();
    }

    async eval(formula)
    {
        let result = {
            status: "",
            source: null,
            data: []
        };

        let doi_data_formula = null;

        if ( formula.manifest )
        {
            let dois = formula.manifest.get_doi();

            if ( "ok" == dois.status )
            {
                for ( var doi in dois.data )
                {
                    doi_data_formula = dois.data[doi];

                    let cached_data = this.Cache.get_data_by_doi(doi_data_formula);
                    
                    if ("ok" == cached_data.status)
                    {
                        result.status = "ok";
                        result.source = "Cache";
                        result.data = cached_data.data;

                        return result;
                    }
                }
            }
        }

        let dependencies_data = new Map();

        let dependencies = formula.get_dependencies();

        if ("ok" == dependencies.status)
        {
            for ( var dependency_manifest in dependencies.data )
            {
                let manifest = dependencies.data[dependency_manifest];
                
                let manifest_data = await this.Network.search_data(manifest);

                if ( "ok" == manifest_data.status )
                    dependencies_data.set( manifest.ArgName, manifest_data.data );
                else
                {
                    result.status = "Has no data for formula's dependency: " + manifest.ArgName;
                    return result;
                }
            }
        }
        else
        {
            result.status = "Formula has no dependencies";
            return result;
        }

        let eval_result = await formula.eval(dependencies_data);

        if ( "ok" == eval_result.status )
        {
            //TODO: let check_result = formula.manifest.check_data(eval_result.data);
            
            result.status = "ok";
            result.source = "Evaluation";
            result.data = eval_result.data;

            if ( doi_data_formula )
                this.Cache.set_data_by_doi(eval_result.data, doi_data_formula);
        }
        else
            result.status = "Error evaluation formula (" + eval_result.status + ")";

        return result;
    }
}