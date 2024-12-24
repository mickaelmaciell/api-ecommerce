const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definição das configurações do Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Versão do OpenAPI
    info: {
      title: 'API Ecommerce', // Título da documentação
      version: '1.0.0', // Versão da API
      description: 'Documentação da API Ecommerce', // Descrição da API
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL do servidor
        description: 'Servidor local', // Descrição do servidor
      },
    ],
    components: {
      // Configuração de autenticação
      securitySchemes: {
        bearerAuth: {
          type: 'http', // Tipo de autenticação
          scheme: 'bearer', // Esquema usado
          bearerFormat: 'JWT', // Formato do token (JWT)
        },
      },
      // Definição dos esquemas usados na API
      schemas: {
        User: {
          type: 'object',
          required: ['firstname', 'surname', 'email', 'password'], // Campos obrigatórios
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'ID do usuário (opcional, gerado automaticamente se não fornecido)',
            },
            firstname: {
              type: 'string',
              example: 'João',
              description: 'Primeiro nome do usuário',
            },
            surname: {
              type: 'string',
              example: 'Silva',
              description: 'Sobrenome do usuário',
            },
            email: {
              type: 'string',
              example: 'joao@mail.com',
              description: 'Email do usuário',
            },
            password: {
              type: 'string',
              example: '123@123',
              description: 'Senha do usuário',
            },
          },
        },
        Product: {
          type: 'object',
          required: ['name', 'price'], // Campos obrigatórios
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Tênis Esportivo',
              description: 'Nome do produto',
            },
            slug: {
              type: 'string',
              example: 'tenis-esportivo',
              description: 'Slug único para o produto',
            },
            description: {
              type: 'string',
              example: 'Tênis ideal para corrida e academia.',
              description: 'Descrição do produto',
            },
            price: {
              type: 'number',
              example: 199.99,
              description: 'Preço original do produto',
            },
            price_with_discount: {
              type: 'number',
              example: 159.99,
              description: 'Preço com desconto do produto',
            },
            stock: {
              type: 'integer',
              example: 100,
              description: 'Quantidade disponível em estoque',
            },
            enabled: {
              type: 'boolean',
              example: true,
              description: 'Indica se o produto está ativo ou não',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do produto',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização do produto',
            },
          },
        },
        Category: {
          type: 'object',
          required: ['name', 'slug'], // Campos obrigatórios
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Eletrônicos',
              description: 'Nome da categoria',
            },
            slug: {
              type: 'string',
              example: 'eletronicos',
              description: 'Slug único para a categoria',
            },
            use_in_menu: {
              type: 'boolean',
              example: true,
              description: 'Indica se a categoria será exibida no menu',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-12-22T10:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-12-22T11:00:00Z',
            },
          },
        },
        ProductImage: {
          type: 'object',
          required: ['product_id', 'path'], // Campos obrigatórios
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            product_id: {
              type: 'integer',
              example: 101,
              description: 'ID do produto ao qual a imagem pertence',
            },
            path: {
              type: 'string',
              example: '/images/product1.jpg',
              description: 'Caminho da imagem do produto',
            },
            enabled: {
              type: 'boolean',
              example: true,
              description: 'Indica se a imagem está ativa',
            },
          },
        },
        ProductOption: {
          type: 'object',
          required: ['product_id', 'title', 'type', 'values'], // Campos obrigatórios
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            product_id: {
              type: 'integer',
              example: 101,
              description: 'ID do produto ao qual a opção pertence',
            },
            title: {
              type: 'string',
              example: 'Cores disponíveis',
              description: 'Título da opção',
            },
            shape: {
              type: 'string',
              enum: ['square', 'circle'],
              example: 'circle',
              description: 'Forma da opção (quadrado ou círculo)',
            },
            radius: {
              type: 'integer',
              example: 10,
              description: 'Raio da opção (caso aplicável)',
            },
            type: {
              type: 'string',
              enum: ['text', 'color'],
              example: 'color',
              description: 'Tipo da opção (texto ou cor)',
            },
            values: {
              type: 'string',
              example: 'Red,Blue,Green',
              description: 'Valores disponíveis para a opção',
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }], // Exige autenticação com token
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas onde estão os endpoints documentados
};

const swaggerSpec = swaggerJSDoc(options);

// Configuração para servir a documentação no endpoint `/api/docs`
const setupSwaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Documentação disponível em http://localhost:3000/api/docs');
};

module.exports = setupSwaggerDocs;
