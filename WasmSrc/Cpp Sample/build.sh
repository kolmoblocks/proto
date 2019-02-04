emcc main.cpp -O1 -s WASM=1 -s EXPORTED_FUNCTIONS="[_set_arg, _get_result, _get_result_size, _exec]" -o main.js
wasm2wat main.wasm -o main.wast
