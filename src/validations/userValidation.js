const Joi = require('joi');

const createUserSchema = Joi.object({
  id: Joi.number()
    .integer()
    .optional()
    .description('ID do usuário (opcional, gerado automaticamente se não fornecido)'),
  firstname: Joi.string()
    .min(2)
    .required()
    .description('Primeiro nome do usuário'),
  surname: Joi.string()
    .min(2)
    .required()
    .description('Sobrenome do usuário'),
  email: Joi.string()
    .email()
    .required()
    .description('Email do usuário'),
  password: Joi.string()
    .min(6)
    .required()
    .description('Senha do usuário'),
});

const updateUserSchema = Joi.object({
  firstname: Joi.string().min(2),
  surname: Joi.string().min(2),
  email: Joi.string().email(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
