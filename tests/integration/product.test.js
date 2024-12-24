const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/models');

describe('Product Endpoints', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it('Deve retornar todos os produtos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Deve criar um novo produto', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Notebook',
      slug: 'notebook',
      enabled: true,
      stock: 10,
      description: 'Um notebook de alta performance.',
      price: 5000.0,
      price_with_discount: 4500.0,
      categoryIds: [1],
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
