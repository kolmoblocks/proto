const Engine = require("./Engine.js");

let options = {
    Network: {
        DedicatedServer: "127.0.0.1:3000"
    }
};

const engine = new Engine(options);

let doi = "7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C";


engine.network().search_manifest(doi).then( manifest => {

    if ( "ok" == manifest.status )
    {
        let formulas = manifest.data.get_formulas();

        if ( "ok" == formulas.status )
        {
            formulas.data.forEach(formula => {

                let dep_with_data_counter = 0;

                let dependencies = formula.get_dependencies();
            
                if ( "ok" == dependencies.status )
                {
                    dependencies.data.forEach(manifest_of_dependency => {
                        
                        if (0 == manifest_of_dependency.get_formulas().data.length)
                        {
                            engine.network().search_data(manifest_of_dependency).then( res =>{
                         
                                if ("ok" == res.status)
                                {
                                    console.log("Dependency has data ",res);
                                    dep_with_data_counter = dep_with_data_counter + 1;
                                }
                                else
                                {
                                    console.log("Dependency has no data");
                                    // search_manifest
                                    // get_formulas
                                    // get_dependecies
                                    // search_data
                                    // get all dependencies data -> eval formula
                                }

                                if ( dep_with_data_counter == dependencies.data.length )
                                {
                                    engine.eval( formula ).then( evaluated_formula => {
                                        if ( "ok" == evaluated_formula.status )
                                        {
                                            console.log("Evaluated formula's data is ",evaluated_formula.data);
                                        }
                                        else
                                        {
                                            console.log("Formula can not be evaluated ",evaluated_formula.status);
                                        }
                                    } );
                                }

                            } );
                        }

                    });
                }
                else
                    console.log(dependencies.status);
            });
        }
        else
            console.log(formulas.status);
    }
    else
    {
        console.log(manifest.status);
    }
});










/*const KBcache = require("./KBcache.js");
const KBstorage = require("./KBstorage.js");


{
    const cache = new KBcache("127.0.0.1", 3000);

    {
        cache.GetDataExpressionByCID("FCE90620CE70369D4B6A5554CD8E52CA43B0AE303A9DE8014A5CAA88B310394D").then( data => {
            console.log("Expression as JSON: ", JSON.stringify(data));
        });

        cache.GetRawDataByRef("file1.txt").then( data => {
            console.log("Data as array: ", new Uint8Array(data));
        });
        
    }
}


{
    const storage = new KBstorage("127.0.0.1", 3000);

    {
        let exp = "{ \"cid\" : \"FCE90620CE70369D4B6A5554CD8E52CA43B0AE303A9DE8014A5CAA88B310394D\" }";

        storage.GetData(exp).then( data => {

            console.log("-------------- test --------------");

            console.log("Data: ",data);

            let exp = "{ \"cid\" : \"7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C\" }";

            storage.ParseExpression(exp).then( exp_array =>{

                for ( var i in exp_array )
                    console.log(JSON.stringify(exp_array[i]));
            } );

        });


        let expression = "{ \"cid\" : \"7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C\" }";

        storage.GetData(expression).then( data => {

            console.log("-------------- first --------------");
            console.log(expression);
            
            if ( null == data )
            {
                console.log("Empty data");
            }
            else
            {
                console.log("MIME " + data["MIME"]);
                console.log("size " + data["size"]);
                console.log(data);
            }

        });

        expression = "{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_concat_\" }, \"arg1\" : { \"cid\" : \"2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824\" }, \"arg2\" : { \"cid\" : \"B493D48364AFE44D11C0165CF470A4164D1E2609911EF998BE868D46ADE3DE4E\" } } }";
    
        storage.GetData(expression).then( data => {

            console.log("-------------- second --------------");
            console.log(expression);

            if ( null == data )
            {
                console.log("Empty data");
            }
            else
            {
                console.log("MIME " + data["MIME"]);
                console.log("size " + data["size"]);
                console.log(data);
            }

        });
    }


}
*/
/*
TODO: do this code working !
{
    // code for demo project
    let exp = "{ \"cid\" : \"7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C\" }";

    // get information for requested expression 
    let inCache = MyStorage.ExpressionInCache(JSON.parse(exp));
    console.log(exp + ", InCache " + inCache);

    // expecting array of expressions or empty array if error or exp has no inner expressions
    let exp_array = MyStorage.ParseExpression(exp);

    for ( var i in exp_array )
    {
        let inCache = MyStorage.ExpressionInCache(exp_array[i]);
    
        console.log(JSON.stringify(exp_array[i]) + ", InCache " + inCache);
    }

    while( 0 != exp_array.length )
    {
        let new_exp_array = new Array();

        for ( var i in exp_array )
        {
            let str_exp = JSON.stringify(exp_array[i]);
            
            let exp = MyStorage.ParseExpression(str_exp);

            for ( var j in exp )
            {
                new_exp_array.push(exp[j]);

                let inCache = MyStorage.ExpressionInCache(exp[j]);
            
                console.log(JSON.stringify(exp[j]) + ", InCache " + inCache);
            }
        }

        exp_array = new_exp_array;
    }
}*/
