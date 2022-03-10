const inquirer = require("inquirer");

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual a primeira nota?'
    },
    {
        name: 'p2',
        message: 'Qual a segunda nota?'
    }
])
.then( res => {
    console.log("Notas: ", res);
    console.log("Média: ", (parseInt(res.p1) + parseInt(res.p2)) / 2);
})
.catch(err => console.log(err))