const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { createProductSchema, updateProductSchema } = require('../validations/productValidation');
const validationMiddleware = require('../middleware/validationMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos.
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obter um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do produto.
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: [] # Adiciona autenticação com Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput' # Esquema para entrada
 *           example:
 *             name: "Tênis Esportivo"
 *             slug: "tenis-esportivo"
 *             description: "Tênis ideal para corrida e academia."
 *             price: 199.99
 *             price_with_discount: 159.99
 *             stock: 100
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' # Esquema para saída
 *             example:
 *               id: 1
 *               name: "Tênis Esportivo"
 *               slug: "tenis-esportivo"
 *               description: "Tênis ideal para corrida e academia."
 *               price: 199.99
 *               price_with_discount: 159.99
 *               stock: 100
 *               enabled: true
 *               createdAt: "2024-12-23T00:00:00.000Z"
 *               updatedAt: "2024-12-23T00:00:00.000Z"
 *       400:
 *         description: Dados inválidos. O corpo da requisição não está correto.
 *         content:
 *           application/json:
 *             example:
 *               error: "Dados inválidos"
 *               details: ["'name' é obrigatório"]
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 *         content:
 *           application/json:
 *             example:
 *               error: "Token não fornecido"
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro interno no servidor"
 */
router.post('/', validationMiddleware(createProductSchema), productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletar um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso.
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
