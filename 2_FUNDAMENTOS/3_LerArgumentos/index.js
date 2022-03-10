// Ler tudo
console.log("Pegando tudo: ", process.argv);

// Pegando apenas argumentos
const args = process.argv.splice(2);
console.log("Argumentos: ", args);

// Pegando apenas valores
const nome = args[0].split('=')[1];
const idade = args[1].split('=')[1];
console.log('Nome: ', nome);
console.log('Idade: ', idade);