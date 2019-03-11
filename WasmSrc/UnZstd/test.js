const wasm = require('..//..//Scripts//Node//Wasm.js');
const server = require('..//..//Scripts//Node//Server.js');

const Server = new server("http://127.0.0.1:3000");

console.log("Test for Zstd decompression (pdf_2_html_wasm_jsglue_zst_ ----UnZstd----> _pdf_2_html_wasm_jsglue_)");

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