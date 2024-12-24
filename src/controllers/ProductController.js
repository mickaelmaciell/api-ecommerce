const { Op } = require('sequelize');
const { Product, Category } = require('../models');

// Obter todos os produtos
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'categories',
        through: { attributes: [] }, // Exclui a tabela intermediária dos resultados
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.', details: error.message });
  }
};

// Criar um novo produto
const createProduct = async (req, res) => {
  const { name, slug, enabled, stock, description, price, price_with_discount, categoryIds } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      slug,
      enabled,
      stock,
      description,
      price,
      price_with_discount,
    });

    // Associar categorias, se fornecidas
    if (categoryIds && categoryIds.length > 0) {
      const categories = await Category.findAll({ where: { id: categoryIds } });
      await newProduct.addCategories(categories);
    }

    // Buscar o produto com categorias associadas para retornar no response
    const productWithCategories = await Product.findByPk(newProduct.id, {
      include: { model: Category, as: 'categories' },
    });

    res.status(201).json(productWithCategories);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar produto.', details: error.message });
  }
};

// Obter um produto pelo ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        as: 'categories',
      },
    });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto.', details: error.message });
  }
};

// Atualizar um produto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, slug, enabled, stock, description, price, price_with_discount, categoryIds } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

    await product.update({
      name,
      slug,
      enabled,
      stock,
      description,
      price,
      price_with_discount,
    });

    // Atualizar categorias associadas
    if (categoryIds) {
      const categories = await Category.findAll({ where: { id: categoryIds } });
      await product.setCategories(categories);
    }

    // Buscar o produto atualizado com categorias associadas
    const updatedProduct = await Product.findByPk(id, {
      include: { model: Category, as: 'categories' },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar produto.', details: error.message });
  }
};

// Deletar um produto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto.', details: error.message });
  }
};

const getFilteredProducts = async (req, res) => {
  const { limit = 12, page = 1, category_ids, price_range, match } = req.query;
  const offset = (page - 1) * limit;

  try {
    const filters = {};

    // Filtro por categorias
    if (category_ids) {
      const categoryArray = category_ids.split(',').map(Number);
      filters['$categories.id$'] = categoryArray;
    }

    // Filtro por preço
    if (price_range) {
      const [minPrice, maxPrice] = price_range.split('-').map(Number);
      filters.price = { [Op.between]: [minPrice, maxPrice] };
    }

    // Filtro por nome ou descrição
    if (match) {
      filters[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } },
      ];
    }

    // Busca no banco de dados
    const products = await Product.findAndCountAll({
      where: filters,
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
        },
      ],
      limit: Number(limit),
      offset: Number(offset),
    });

    res.status(200).json({
      data: products.rows,
      total: products.count,
      limit: Number(limit),
      page: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.', details: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
};
