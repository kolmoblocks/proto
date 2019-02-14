wasm-pack build --scope mignatovich
wasm2wat ./pkg/hashcalculator_bg.wasm -o ./pkg/hashcalculator_bg.wat
cp ./pkg/hashcalculator_bg.wasm ../../Server/files/hashcalculator.wasm
node ./src/test.js
