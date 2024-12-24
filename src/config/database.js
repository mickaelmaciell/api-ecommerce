require('dotenv').config(); // Carrega as variáveis do .env
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DIALECT:', process.env.DB_DIALECT);

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nome do banco
  process.env.DB_USER,       // Usuário do banco
  process.env.DB_PASSWORD,   // Senha do banco
  {
    host: process.env.DB_HOST,  // Endereço do banco
    dialect: process.env.DB_DIALECT, // Tipo do banco (mysql)
    logging: false,  // Desativa os logs SQL
  }
);

module.exports = sequelize;
