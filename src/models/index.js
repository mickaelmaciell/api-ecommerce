const sequelize = require('../config/database'); // Configuração do banco de dados
const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const ProductImage = require('./ProductImage');
const ProductOption = require('./ProductOption');
const ProductCategory = require('./ProductCategory');

// Definindo os relacionamentos

// Relacionamento entre Produtos e Categorias (Muitos-para-Muitos)
Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: 'product_id',
  as: 'categories',
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: 'category_id',
  as: 'products',
});

// Relacionamento entre Produto e Imagens (Um-para-Muitos)
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

// Relacionamento entre Produto e Opções (Um-para-Muitos)
Product.hasMany(ProductOption, { foreignKey: 'product_id', as: 'options' });
ProductOption.belongsTo(Product, { foreignKey: 'product_id' });

// Exportando os modelos
module.exports = {
  sequelize,
  User,
  Product,
  Category,
  ProductImage,
  ProductOption,
  ProductCategory,
};
