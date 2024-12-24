
![page sw1](https://github.com/user-attachments/assets/cbb4ace8-0cd2-4eb7-8178-3a8bb0e46de0)
![page sw2](https://github.com/user-attachments/assets/109fa066-8035-4307-9d5e-5c4529bc412d)
![page sw3](https://github.com/user-attachments/assets/7eb20127-b0d6-45ae-86db-0eb5466e3f18)
# API Ecommerce

🚀 **Projeto API Ecommerce**: Uma aplicação backend para gerenciar produtos, categorias, usuários e opções de produtos. O projeto inclui autenticação JWT, documentação com Swagger UI e exemplos de uso com Postman.

---

## 📂 Estrutura do Projeto

```plaintext
api-ecommerce/
├── .vscode/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── database.js
│   ├── controllers/
│   │   ├── CategoryController.js
│   │   ├── ProductController.js
│   │   ├── ProductImageController.js
│   │   ├── ProductOptionController.js
│   │   ├── UserController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── validationMiddleware.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── index.js
│   │   ├── productCategory.js
│   │   ├── productImage.js
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── productOption.js
│   ├── routes/
│   │   ├── UserRoutes.js
│   │   ├── ProductRoutes.js
│   │   ├── CategoryRoutes.js
│   │   ├── productOptionRoutes.js
│   │   ├── productImageRoutes.js
│   ├── validations/
│   │   ├── productValidation.js
│   │   ├── userValidation.js
│   ├── app.js
│   ├── server.js
├── tests/
│   ├── integration/
│   │   ├── category.test.js
│   │   ├── product.test.js
│   │   ├── user.test.js
│   ├── utils/
├── .env
├── package.json
├── .gitignore
├── package-lock.json
```

---

## 🛠️ **Configuração**

### 1. **Clonar o Repositório**
```bash
git clone <seu-repositorio>
cd api-ecommerce
```

### 2. **Instalar Dependências**
```bash
npm install
```

### 3. **Configurar o Banco de Dados**
- No arquivo `.env`, defina as seguintes variáveis:
  ```plaintext
  DB_NAME=ecommerce_api
  DB_USER=root
  DB_PASSWORD=seu_password
  DB_HOST=localhost
  DB_DIALECT=mysql
  PORT=3000
  JWT_SECRET=sua_chave_secreta
  ```

- Importe o arquivo SQL do banco de dados:
  - **Arquivo**: Coloque o arquivo `.sql` na pasta principal do projeto.
  - Comando MySQL para importar:
    ```bash
    mysql -u root -p ecommerce_api < ecommerce_api.sql
    ```

### 4. **Iniciar o Servidor**
```bash
npm start
```
- O servidor será iniciado em: `http://localhost:3000`

---

## 🛠️ **Uso com Postman**

- **Importar o Arquivo do Postman**: 
  - Coloque o arquivo `.json` do Postman na pasta principal do projeto.
  - Importe no Postman:
    1. Abra o Postman.
    2. Vá em `File > Import`.
    3. Selecione o arquivo `.json` fornecido.

- **Endpoints Disponíveis**:
  1. **Usuários**:
     - `POST /api/users`: Criar usuário.
     - `POST /api/users/token`: Gerar token JWT.
     - `GET /api/users`: Listar usuários (Requer token).
  2. **Produtos**:
     - `GET /api/products`: Listar produtos.
     - `POST /api/products`: Criar produto (Requer token).

---

## 📄 **Swagger UI**

- Acesse a documentação no navegador:
  ```
  http://localhost:3000/api/docs
  ```

### Autenticação no Swagger
1. Clique em `Authorize` no canto superior direito.
2. Insira o token JWT no formato: `Bearer <seu-token>`.

---

## ✅ **Testes**

- Execute os testes para verificar as funcionalidades:
```bash
npm test
```

---

## ✨ **Funcionalidades Implementadas**

- **Autenticação JWT**:
  - Geração e validação de tokens JWT.
- **CRUD Completo**:
  - Usuários, Produtos, Categorias e Opções de Produtos.
- **Validações**:
  - Feitas com Joi.
- **Documentação**:
  - Swagger UI integrado.
- **Testes Automatizados**:
  - Feitos com Jest e Supertest.

---



## 💾 **Estrutura do Banco de Dados**

### Tabelas Principais:
1. **Users**
2. **Products**
3. **Categories**
4. **Product Options**
5. **Product Images**

---

## 🧩 **Dicas Adicionais**

- **Verifique a Conexão do Banco de Dados**: Use o comando no terminal:
  ```bash
  mysql -u root -p -e "SHOW DATABASES;"
  ```
- **Debug do JWT**: Verifique se o token está sendo enviado corretamente no cabeçalho `Authorization`.

---

---
## 🗂️ **Arquivos POSTMAN + SQL**
[BancoDados + PostMan.zip](https://github.com/user-attachments/files/18234333/BancoDados.%2B.PostMan.zip)

---

---
## 🥷 **Equipe**
- Mickael do Nascimento Maciel
- Ana Karoline Freitas Nobrega
- Abraão Alves do Nascimento

---
Desenvolvido com ❤️ para fins de aprendizado!
