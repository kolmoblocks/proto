wasm-pack build --scope mignatovich
wasm2wat ./pkg/lowercase_bg.wasm -o ./pkg/lowercase_bg.wat
cp ./pkg/lowercase_bg.wasm ../../Server/files/lowercase.wasm
node ./src/test.js
