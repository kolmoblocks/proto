emcc main.cpp -O1 -s WASM=1 -s EXPORTED_FUNCTIONS="[_set_arg_name, _get_arg_index, _set_arg, _get_result, _get_result_size, _exec, _get_last_error, _get_last_error_size]" -s MODULARIZE=1 -o unzstd.js -I src main.cpp {lib/common,lib/decompress}/*.c
wasm2wat unzstd.wasm -o unzstd.wast
cp unzstd.wasm ../../Server/files/unzstd.wasm
cp unzstd.js ../../Server/files/unzstd.js
node test.js