const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/models');

let token; // Variável para armazenar o token

describe('Category Endpoints', () => {
  // Antes de todos os testes, realizar o login e obter o token JWT
  beforeAll(async () => {
    const res = await request(app).post('/api/users/token').send({
      email: 'joao@mail.com', // Certifique-se de que este usuário existe no banco de dados
      password: 'senha123',
    });
    token = res.body.token; // Armazena o token gerado
  });

  // Após todos os testes, encerra a conexão com o banco de dados
  afterAll(async () => {
    await sequelize.close();
  });

  it('Deve retornar todas as categorias', async () => {
    const res = await request(app)
      .get('/api/categories')
      .set('Authorization', `Bearer ${token}`); // Adiciona o token no cabeçalho
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Deve criar uma nova categoria', async () => {
    const res = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`) // Adiciona o token no cabeçalho
      .send({
        name: 'Eletrônicos',
        slug: 'eletronicos',
        use_in_menu: true,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id'); // Verifica se retorna o ID da categoria criada
  });

  it('Deve retornar erro 401 sem token', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send({
        name: 'Sem Token',
        slug: 'sem-token',
        use_in_menu: false,
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Token não fornecido.');
  });
});
