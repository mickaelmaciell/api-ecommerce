const Joi = require('joi'); // Certifique-se de que o Joi está instalado no projeto

// Validação para criação de produto
const createProductSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome do produto é obrigatório.',
    'any.required': 'O nome do produto é obrigatório.',
  }),
  slug: Joi.string().required().messages({
    'string.empty': 'O slug do produto é obrigatório.',
    'any.required': 'O slug do produto é obrigatório.',
  }),
  description: Joi.string().optional(),
  price: Joi.number().required().messages({
    'number.base': 'O preço deve ser um número.',
    'any.required': 'O preço é obrigatório.',
  }),
  price_with_discount: Joi.number().required().messages({
    'number.base': 'O preço com desconto deve ser um número.',
    'any.required': 'O preço com desconto é obrigatório.',
  }),
  stock: Joi.number().integer().optional().default(0),
  category_ids: Joi.array().items(Joi.number().integer()).optional(),
}).unknown(false);

// Validação para atualização de produto
const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  price_with_discount: Joi.number().optional(),
  stock: Joi.number().integer().optional(),
  category_ids: Joi.array().items(Joi.number().integer()).optional(),
}).unknown(false);

module.exports = { createProductSchema, updateProductSchema };
