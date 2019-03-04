wasm-pack build --scope mignatovich
cp ./pkg/unbrotli_bg.wasm ../../Server/files/unbrotli.wasm
node ./src/test.js