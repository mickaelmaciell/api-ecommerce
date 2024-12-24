const { Category } = require('../models');

// Listar todas as categorias
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias.', details: error.message });
  }
};

// Criar uma nova categoria
const createCategory = async (req, res) => {
  const { name, slug, use_in_menu } = req.body;

  try {
    const newCategory = await Category.create({ name, slug, use_in_menu });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar categoria.', details: error.message });
  }
};

// Obter uma categoria pelo ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categoria.', details: error.message });
  }
};

// Atualizar uma categoria
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, use_in_menu } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });

    await category.update({ name, slug, use_in_menu });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar categoria.', details: error.message });
  }
};

// Deletar uma categoria
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });

    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar categoria.', details: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
