const { ProductOption } = require('../models');

// Criar uma nova opção para um produto
const createOption = async (req, res) => {
  const { productId } = req.params;
  const { title, shape, radius, type, values } = req.body;

  try {
    const newOption = await ProductOption.create({
      product_id: productId,
      title,
      shape,
      radius,
      type,
      values,
    });

    res.status(201).json(newOption);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar opção.', details: error.message });
  }
};

// Listar todas as opções de um produto
const getOptionsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const options = await ProductOption.findAll({ where: { product_id: productId } });
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar opções.', details: error.message });
  }
};

// Atualizar uma opção existente
const updateOption = async (req, res) => {
  const { optionId } = req.params;
  const { title, shape, radius, type, values } = req.body;

  try {
    const option = await ProductOption.findByPk(optionId);
    if (!option) return res.status(404).json({ error: 'Opção não encontrada.' });

    await option.update({ title, shape, radius, type, values });
    res.status(200).json(option);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar opção.', details: error.message });
  }
};

module.exports = {
  createOption,
  getOptionsByProduct,
  updateOption,
};
