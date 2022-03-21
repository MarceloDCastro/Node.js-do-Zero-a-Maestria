const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// try{
//     sequelize.authenticate();
//     console.log("Conectado com Sequelize")
// } catch(err){
//     console.log('Erro Sequelize: ', err)
// }

module.exports = sequelize;