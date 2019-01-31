echo use https://webassembly.studio/ to build
echo use https://github.com/kolmoblocks/kolmopack/blob/master/out/public/7cfd5747dd92443a30e230caf3f092a9b9880096f0d51d13433a9957c8d546d4.json to test
cp ./Studio/out/main.wasm ../../Server/files/huffman2.wasm
node ./src/test.js