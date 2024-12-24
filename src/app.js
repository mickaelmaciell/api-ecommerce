const express = require('express');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const categoryRoutes = require('./routes/CategoryRoutes'); // Importar rotas de categorias
const productRoutes = require('./routes/ProductRoutes');
const productImageRoutes = require('./routes/productImageRoutes');
const productOptionRoutes = require('./routes/productOptionRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



// Middleware para parsing JSON
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes); // Isso conecta o endpoint `/api/categories` às rotas de categorias
app.use('/api/products', productRoutes);
app.use('/api', productImageRoutes);
app.use('/api/products', productOptionRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo à API Ecommerce!');
});

module.exports = app;
