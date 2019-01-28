wasm-pack build --scope mignatovich
wasm2wat ./pkg/uppercase_bg.wasm -o ./pkg/uppercase_bg.wat
cp ./pkg/uppercase_bg.wasm ../../Server/files/uppercase.wasm
node ./src/test.js
