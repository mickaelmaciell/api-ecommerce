const express = require('express');
const router = express.Router();
const ProductImageController = require('../controllers/ProductImageController');

/**
 * @swagger
 * tags:
 *   name: Product Images
 *   description: Gerenciamento de imagens de produtos
 */

/**
 * @swagger
 * /api/products/{productId}/images:
 *   get:
 *     summary: Listar imagens de um produto
 *     tags: [Product Images]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de imagens do produto.
 */
router.get('/products/:productId/images', ProductImageController.getImagesByProductId);

/**
 * @swagger
 * /api/products/{productId}/images:
 *   post:
 *     summary: Criar uma nova imagem para um produto
 *     tags: [Product Images]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductImage'
 *     responses:
 *       201:
 *         description: Imagem criada com sucesso.
 */
router.post('/products/:productId/images', ProductImageController.createImage);

module.exports = router;
