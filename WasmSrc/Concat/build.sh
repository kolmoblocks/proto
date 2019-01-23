wasm-pack build --scope mignatovich
wasm2wat ./pkg/concat_bg.wasm -o ./pkg/concat_bg.wat
cp ./pkg/concat_bg.wasm ../../Server/files/concat.wasm