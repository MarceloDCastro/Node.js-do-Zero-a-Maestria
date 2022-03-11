// Módulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

// Módulos internos
const fs = require('fs');

operation();

function operation () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        }
    ])
    .then(({action}) => {
        if (action == 'Criar conta'){
            createAccount();
        } else if (action == 'Consultar saldo'){
            checkBalance();
        }else if (action == 'Depositar'){
            deposit();
        }else if (action == 'Sacar'){
            take();
        }else if (action == 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Account!'))
            process.exit();
        }
        
    })
    .catch(err => console.log(err))
}

function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk.blue('Defina as opções da sua conta'));
    buildAccount();
}

function checkAccountExist(accountName){
    if (fs.existsSync('accounts/'+accountName+'.json'))
        return true;
    return false;
}

function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Nome da conta: ',
        }
    ])
    .then(({accountName}) => {
        if (!fs.existsSync('accounts'))
            fs.mkdirSync('accounts');
        if (checkAccountExist(accountName)){
            console.log(chalk.bgRed.black('Esta conta já existe!'));
            buildAccount();
            return;
        }

        fs.writeFileSync('accounts/'+accountName+'.json', '{"balance": 0}', (err) => console.log(err))
        console.log(chalk.green(`Conta ${chalk.blue(accountName)} criada!`))
        operation();
    })
    .catch(err => console.log(err))
}

function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Nome da conta: ',
        }
    ])
    .then(({accountName}) => {
        if (!checkAccountExist(accountName)){
            console.log(chalk.bgRed('Esta conta não existe!'));
            return deposit();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Valor (R$): ',
            }
        ])
        .then(({amount}) => {
            addAmount(accountName, amount);
            operation();
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function take(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Nome da conta: ',
        }
    ])
    .then(({accountName}) => {
        if (!checkAccountExist(accountName)){
            console.log(chalk.bgRed('Esta conta não existe!'));
            return take();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Valor (R$): ',
            }
        ])
        .then(({amount}) => {
            removeAmount(accountName, amount);
            operation();
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function addAmount(accountName, amount){
    if (!amount || amount < 0){
        console.log(chalk.bgRed.black('Valor irregular'));
        return deposit();
    }

    const accountData = getAccount(accountName, amount);
    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount);
    
    fs.writeFileSync('accounts/'+accountName+'.json', JSON.stringify(accountData), (err) => console.log(err));
    console.log(chalk.bgGreen.black(`Depositado R$ ${amount}!`));
    console.log(chalk.green(`Saldo: R$ ${accountData.balance}!`));
}

function removeAmount(accountName, amount){
    if (!amount || amount < 0){
        console.log(chalk.bgRed.black('Valor irregular'));
        return take();
    }

    const accountData = getAccount(accountName, amount);

    if(parseFloat(accountData.balance) < parseFloat(amount)){
        console.log(chalk.red('Saldo insuficiente!'));
        return take();
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);
    
    fs.writeFileSync('accounts/'+accountName+'.json', JSON.stringify(accountData), (err) => console.log(err));
    console.log(chalk.bgGreen.black(`Sacado R$ ${amount}!`));
    console.log(chalk.green(`Saldo: R$ ${accountData.balance}!`));
}

function getAccount(accountName){
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r',
    });

    return JSON.parse(accountJson);
}

function checkBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Nome da conta: ',
        }
    ])
    .then(({accountName}) => {
        if(!checkAccountExist(accountName)){
            console.log(chalk.bgRed.black('Esta conta não existe!'));
            return checkBalance();
        }
        console.log(chalk.green(`Saldo: R$ ${getAccount(accountName)?.balance}`));
        operation();
    })
    .catch(err => console.log(err))
}