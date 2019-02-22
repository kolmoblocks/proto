emcc main.cpp -O1 -s WASM=1 -s EXPORTED_FUNCTIONS="[_set_arg, _get_result, _get_result_size, _exec]" -s MODULARIZE=1 -o doc2html.js -I wv main.cpp {glib,gsf,wv}/*.c
