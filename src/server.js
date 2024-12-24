const app = require('./app'); // Importa o arquivo principal da aplicação Express
const { sequelize } = require('./models'); // Importa a instância do Sequelize para manipular o banco de dados
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const setupSwaggerDocs = require('./docs/swagger'); // Configuração do Swagger para documentação da API

// Logs das variáveis de ambiente para verificar se estão configuradas corretamente
console.log('Conexão com o banco de dados:');
console.log('DB_NAME:', process.env.DB_NAME); // Nome do banco de dados
console.log('DB_USER:', process.env.DB_USER); // Usuário do banco de dados
console.log('DB_HOST:', process.env.DB_HOST); // Host do banco de dados

// Sincroniza o banco de dados com os modelos definidos no Sequelize
sequelize.sync({ alter: true  }) // 'force: false' evita recriar tabelas toda vez que o servidor reinicia
  .then(() => {
    console.log('📦 Banco de dados sincronizado com sucesso!');
    const PORT = process.env.PORT || 3000; // Define a porta do servidor a partir do .env ou padrão 3000
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      setupSwaggerDocs(app); // Configura o Swagger para documentação da API
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar o banco de dados:', err); // Trata e exibe erros de conexão
  });
