const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Incrementa automaticamente se não fornecido
    primaryKey: true,
    allowNull: true, // Permite que o campo seja nulo para o Sequelize tratar automaticamente
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Gera automaticamente createdAt e updatedAt
  tableName: 'users',
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User: 
 *       type: object
 *       required:
 *         - firstname
 *         - surname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *           example: 1
 *         firstname:
 *           type: string
 *           description: Primeiro nome
 *         surname:
 *           type: string
 *           description: Sobrenome
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha criptografada
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 */


module.exports = User;
