const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para autenticar o token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>
  
    if (!token) return res.status(401).json({ error: 'Token não fornecido.' });
  
    //! Valida o token e decodifica o usuário
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido.' });
      req.user = user; // Adiciona o usuário decodificado no request
      next();
    });
  };
  
  module.exports = authenticateToken;