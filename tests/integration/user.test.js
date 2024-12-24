const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/models');

describe('User Endpoints', () => {
  afterAll(async () => {
    await sequelize.close(); // Fecha a conexão com o banco
  });

  it('Deve retornar todos os usuários', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Deve criar um novo usuário', async () => {
    const res = await request(app).post('/api/users').send({
      firstname: 'Teste',
      surname: 'Jest',
      email: 'testioopo@jest.com',
      password: '123456'
    });
    expect(res.statusCode).toEqual(201);
  });
});
