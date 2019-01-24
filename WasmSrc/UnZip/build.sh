wasm-pack build --scope mignatovich
wasm2wat ./pkg/unzip_bg.wasm -o ./pkg/unzip_bg.wat
cp ./pkg/unzip_bg.wasm ../../Server/files/unzip.wasm
node ./src/test.js
