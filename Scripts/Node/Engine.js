const Network = require('.//Network.js')

module.exports = class Engine
{
    constructor(settings)
    {
        if ( settings.hasOwnProperty("Network") )
        {
            this.Network = new Network(settings["Network"]);
            return;
        }
        
        throw "Bad engine settings";
    }

    network()
    {
        return this.Network;
    }

    async eval(formula)
    {
        let result = {
            status: "",
            data: []
        };

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
            result.status = "ok";
            result.data = eval_result.data;
        }
        else
            result.status = "Error evaluation formula (" + eval_result.status + ")";

        return result;
    }
}