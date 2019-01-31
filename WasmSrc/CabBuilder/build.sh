wasm-pack build --scope mignatovich
wasm2wat ./pkg/cabbuilder_bg.wasm -o ./pkg/cabbuilder_bg.wat
cp ./pkg/cabbuilder_bg.wasm ../../Server/files/cabbuilder.wasm
node ./src/test.js
