const wasm = require('..//..//..//Scripts//Node//Wasm.js');
const server = require('..//..//..//Scripts//Node//Server.js');

const Server = new server("http://127.0.0.1:3000");

console.log("Test for Brotli decompression (pdf_2_html_wasm_jsglue_br_ ----UnBrotli----> _pdf_2_html_wasm_jsglue_)");

Server.get_data_by_doi("_wasm_unbrotli_").then( wasm_unbrotli => {

    if ( "ok" == wasm_unbrotli.status )
    {
        console.log("_wasm_unbrotli_ size: " + wasm_unbrotli.data.length );

        Server.get_data_by_doi("_pdf_2_html_wasm_jsglue_br_").then( pdf_2_html_wasm_jsglue_br => {

            if ( "ok" == pdf_2_html_wasm_jsglue_br.status )
            {
                console.log("_pdf_2_html_wasm_jsglue_br_ size: " + pdf_2_html_wasm_jsglue_br.data.length );

                Server.get_data_by_doi("_pdf_2_html_wasm_jsglue_").then( pdf_2_html_wasm_jsglue => {

                    if ("ok" == pdf_2_html_wasm_jsglue.status )
                    {
                        console.log("_pdf_2_html_wasm_jsglue_ size: " + pdf_2_html_wasm_jsglue.data.length );

                        // decompress pdf_2_html_wasm_jsglue_br
                        var wasm_wrapper = new wasm(wasm_unbrotli.data, null);
                        
                        var args = new Array();
                        
                        pdf_2_html_wasm_jsglue_br.data["ArgName"] = "Arg1";
                        
                        args.push(pdf_2_html_wasm_jsglue_br.data);
                        
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

                            }
                            else
                                console.log("wasm exec error: " + exec_result.status );

                        } );

                    }
                    else
                        console.log("get_data_by_doi error: " + pdf_2_html_wasm_jsglue.status );    

                } );

            }
            else
                console.log("get_data_by_doi error: " + pdf_2_html_wasm_jsglue_br.status );

        } );

    }
    else
        console.log("get_data_by_doi error: " + wasm_unbrotli.status );

} );