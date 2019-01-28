wasm-pack build --scope mignatovich
wasm2wat ./pkg/strreverse_bg.wasm -o ./pkg/strreverse_bg.wat
cp ./pkg/strreverse_bg.wasm ../../Server/files/strreverse.wasm
node ./src/test.js
