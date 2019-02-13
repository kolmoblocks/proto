emcc main.cpp -O1 -s WASM=1 -s EXPORTED_FUNCTIONS="[_set_arg_name, _get_arg_index, _set_arg, _get_result, _get_result_size, _get_last_error, _get_last_error_size, _exec]" -s MODULARIZE=1 -o main.js
wasm2wat main.wasm -o main.wast
