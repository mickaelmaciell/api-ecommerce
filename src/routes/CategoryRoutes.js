const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController'); 
const authenticateToken = require('../middleware/authMiddleware'); 

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Listar todas as categorias
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', authenticateToken, CategoryController.getCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Criar uma nova categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: [] # Indica que este endpoint requer autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 */
router.post('/', authenticateToken, CategoryController.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obter uma categoria pelo ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da categoria.
 *       404:
 *         description: Categoria não encontrada.
 */
router.get('/:id', authenticateToken, CategoryController.getCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualizar uma categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       204:
 *         description: Categoria atualizada com sucesso.
 */
router.put('/:id', authenticateToken, CategoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deletar uma categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso.
 */
router.delete('/:id', authenticateToken, CategoryController.deleteCategory);

module.exports = router;
