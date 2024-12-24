const express = require('express');
const router = express.Router();
const ProductOptionController = require('../controllers/ProductOptionController');

/**
 * @swagger
 * tags:
 *   name: Product Options
 *   description: Gerenciamento de opções de produtos
 */

/**
 * @swagger
 * /api/products/{productId}/options:
 *   get:
 *     summary: Listar opções de um produto
 *     tags: [Product Options]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de opções do produto.
 */
router.get('/:productId/options', ProductOptionController.getOptionsByProduct);

module.exports = router;
