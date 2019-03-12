const wasm = require('..//..//Scripts//Node//Wasm.js');
const server = require('..//..//Scripts//Node//Server.js');

const Server = new server("http://127.0.0.1:3000");

console.logCopy = console.log.bind(console);

var LastTime = null;

console.log = function(data)
{
    if (arguments.length)
    {
        var now = new Date();

        if ( null == LastTime )
            LastTime = now;

        var timestamp = now.toJSON();

        var diff = now - LastTime;

        var args = arguments;
        
        args[0] = timestamp + ' (+' + diff + ') > ' + arguments[0];
        
        this.logCopy.apply(this, args);

        LastTime = now;
    }
};

async function first()
{
    console.log("Test for Zstd decompression (_pdf_2_html_wasm_jsglue_zst_ ----UnZstd----> _pdf_2_html_wasm_jsglue_)");

    Server.get_data_by_doi("_wasm_unzstd_").then( wasm_unzstd => {

        if ( "ok" == wasm_unzstd.status )
        {
            console.log("_wasm_unzstd_ size: " + wasm_unzstd.data.length );

            Server.get_data_by_doi("_pdf_2_html_wasm_jsglue_zst_").then( pdf_2_html_wasm_jsglue_zst => {

                if ( "ok" == pdf_2_html_wasm_jsglue_zst.status )
                {
                    console.log("_pdf_2_html_wasm_jsglue_zst_ size: " + pdf_2_html_wasm_jsglue_zst.data.length );

                    Server.get_data_by_doi("_pdf_2_html_wasm_jsglue_").then( pdf_2_html_wasm_jsglue => {

                        if ("ok" == pdf_2_html_wasm_jsglue.status )
                        {
                            console.log("_pdf_2_html_wasm_jsglue_ size: " + pdf_2_html_wasm_jsglue.data.length );

                            Server.get_data_by_doi("_wasm_unzstd_jsglue_").then( wasm_unzstd_jsglue => {

                                if ( "ok" == wasm_unzstd_jsglue.status )
                                {
                                    console.log("_wasm_unzstd_jsglue_ size: " + wasm_unzstd_jsglue.data.length );

                                    var wasm_wrapper = new wasm(wasm_unzstd.data, wasm_unzstd_jsglue.data);
                                    
                                    var args = new Array();
                                    
                                    pdf_2_html_wasm_jsglue_zst.data["ArgName"] = "CompressedData";
                                    
                                    args.push(pdf_2_html_wasm_jsglue_zst.data);
                                    
                                    wasm_wrapper.exec(args).then( exec_result => {

                                        if ( "ok" == exec_result.status )
                                        {
                                            console.log("wasm exec result size: " + exec_result.data.length );
                                            
                                            // check decompressed result with pdf_2_html_wasm_jsglue

                                            if ( exec_result.data.length != pdf_2_html_wasm_jsglue.data.length )
                                            {
                                                console.log("TEST FAILED! different size !");
                                                return;
                                            }

                                            for ( var i = 0; i < exec_result.data.length; i++)
                                            {
                                                if (exec_result.data[i] != pdf_2_html_wasm_jsglue.data[i] )
                                                {
                                                    console.log("TEST FAILED! different data at position: " + i);
                                                    return;
                                                }
                                            }

                                            console.log("TEST PASS! Data are equal byte by byte.");
                                            
                                            second();

                                        }
                                        else
                                            console.log("wasm exec error: " + exec_result.status );

                                    } );

                                }
                                else
                                    console.log("get_data_by_doi error: " + wasm_unzstd_jsglue.status );

                            } );

                        }
                        else
                            console.log("get_data_by_doi error: " + pdf_2_html_wasm_jsglue.status );

                    } );

                }
                else
                    console.log("get_data_by_doi error: " + pdf_2_html_wasm_jsglue_zst.status );

            } );

        }
        else
            console.log("get_data_by_doi error: " + wasm_unzstd.status );

    } );
}

async function second()
{
    console.log("Test for Zstd decompression with dictionary (_bootstrap.css.zst_ ----UnZstd + Dictionary----> _bootstrap.css_)");

    Server.get_data_by_doi("_wasm_unzstd_").then( wasm_unzstd => {

        if ( "ok" == wasm_unzstd.status )
        {
            console.log("_wasm_unzstd_ size: " + wasm_unzstd.data.length );

            Server.get_data_by_doi("_wasm_unzstd_jsglue_").then( wasm_unzstd_jsglue => {

                if ( "ok" == wasm_unzstd_jsglue.status )
                {
                    console.log("_wasm_unzstd_jsglue_ size: " + wasm_unzstd_jsglue.data.length );

                    // ZSTD_dictionary.dat  - 112640 ( 58.56%)
                    // bootstrap.css.zst    - 18455  (  9.59%)
                    //------------------------------
                    //                      - 131095 ( 68.15%)

                    // bootstrap.css        - 192348 (100.00%)

                    Server.get_data_by_doi("_bootstrap.css_").then( bootstrap_css => {

                        if ( "ok" == bootstrap_css.status )
                        {
                            console.log("_bootstrap.css_ size: " + bootstrap_css.data.length );

                            Server.get_data_by_doi("_ZSTD_dictionary.dat_").then( ZSTD_dictionary => {

                                if ( "ok" == ZSTD_dictionary.status )
                                {
                                    console.log("_ZSTD_dictionary.dat_ size: " + ZSTD_dictionary.data.length );

                                    Server.get_data_by_doi("_bootstrap.css.zst_").then( bootstrap_css_zst => {

                                        if ( "ok" == bootstrap_css_zst.status )
                                        {
                                            console.log("_bootstrap.css.zst_ size: " + bootstrap_css_zst.data.length );

                                            var wasm_wrapper = new wasm(wasm_unzstd.data, wasm_unzstd_jsglue.data);
                                    
                                            var args = new Array();
                                            
                                            bootstrap_css_zst.data["ArgName"] = "CompressedData";
                                            
                                            args.push(bootstrap_css_zst.data);

                                            ZSTD_dictionary.data["ArgName"] = "Dictionary";
                                            
                                            args.push(ZSTD_dictionary.data);
                                            
                                            wasm_wrapper.exec(args).then( exec_result => {

                                                if ( "ok" == exec_result.status )
                                                {
                                                    console.log("wasm exec result size: " + exec_result.data.length );
                                                    
                                                    // check decompressed result with bootstrap_css

                                                    if ( exec_result.data.length != bootstrap_css.data.length )
                                                    {
                                                        console.log("TEST FAILED! different size !");
                                                        return;
                                                    }

                                                    for ( var i = 0; i < exec_result.data.length; i++)
                                                    {
                                                        if (exec_result.data[i] != bootstrap_css.data[i] )
                                                        {
                                                            console.log("TEST FAILED! different data at position: " + i);
                                                            return;
                                                        }
                                                    }

                                                    console.log("TEST PASS! Data are equal byte by byte.");
                                                    
                                                }
                                                else
                                                    console.log("wasm exec error: " + exec_result.status );

                                            } );

                                        }
                                        else
                                            console.log("get_data_by_doi error: " + bootstrap_css_zst.status);        

                                    } );

                                }
                                else
                                    console.log("get_data_by_doi error: " + ZSTD_dictionary.status);
                            } );

                        }
                        else
                            console.log("get_data_by_doi error: " + bootstrap_css.status);

                    } );

                }
                else
                    console.log("get_data_by_doi error: " + wasm_unzstd_jsglue.status);

            } );
        }
        else
            console.log("get_data_by_doi error: " + wasm_unzstd.status);

    } );
}

first();
