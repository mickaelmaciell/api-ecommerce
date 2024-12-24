const { ProductImage, Product } = require('../models');

// Obter todas as imagens de um produto
const getImagesByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId, {
      include: { model: ProductImage, as: 'images' },
    });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.status(200).json(product.images);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imagens.', details: error.message });
  }
};

// Criar uma nova imagem para um produto
const createImage = async (req, res) => {
  const { productId } = req.params;
  const { path, enabled } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

    const newImage = await ProductImage.create({
      product_id: productId,
      path,
      enabled,
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar imagem.', details: error.message });
  }
};

// Atualizar uma imagem
const updateImage = async (req, res) => {
  const { id } = req.params;
  const { path, enabled } = req.body;
  try {
    const image = await ProductImage.findByPk(id);
    if (!image) return res.status(404).json({ error: 'Imagem não encontrada.' });

    await image.update({ path, enabled });
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar imagem.', details: error.message });
  }
};

// Deletar uma imagem
const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await ProductImage.findByPk(id);
    if (!image) return res.status(404).json({ error: 'Imagem não encontrada.' });

    await image.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar imagem.', details: error.message });
  }
};

module.exports = {
  getImagesByProductId,
  createImage,
  updateImage,
  deleteImage,
};
