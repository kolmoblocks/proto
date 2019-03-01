emcc main.cpp -O1 -s WASM=1 -s EXPORTED_FUNCTIONS="[_set_arg_name, _get_arg_index, _set_arg, _get_result, _get_result_size, _exec, _get_last_error, _get_last_error_size]" -s MODULARIZE=1 -o pdf2html.js -I src main.cpp {fofi,goo,src,xpdf}/*.cc
wasm2wat pdf2html.wasm -o pdf2html.wast
cp pdf2html.wasm ../../Server/files/pdf2html.wasm
cp pdf2html.js ../../Server/files/pdf2html.js