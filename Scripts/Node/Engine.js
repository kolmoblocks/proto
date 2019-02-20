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

    eval(formula)
    {
        let result = {
            status: "",
            data: []
        };

        

        return result;
    }
}