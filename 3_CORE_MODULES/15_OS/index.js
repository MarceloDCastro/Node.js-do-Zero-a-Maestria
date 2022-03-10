const os = require('os');

console.log("Tipo: ", os.type());
console.log("CPUs: ", os.cpus());
console.log("Memória livre: ", os.freemem());
console.log("Diretório principal: ", os.homedir());