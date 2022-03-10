const chalk = require("chalk");

const nota = 8;

if (nota >= 6){
console.log(chalk.green.bold("Parabéns!") + chalk.green("Você foi aprovado"));
} else {
    console.log(chalk.bgRed("Você foi reprovado."));
}