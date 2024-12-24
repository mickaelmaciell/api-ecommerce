const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
require('dotenv').config();

// Obter todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.', details: error.message });
  }
};

// Criar um novo usuário
const createUser = async (req, res) => {
  const { id, firstname, surname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      id,
      firstname,
      surname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.', details: error.message });
  }
};

// Geração de Token JWT
const generateToken = async (req, res) => {
  const { email, password } = req.body;

  console.log('Email recebido:', email);

  try {
    const user = await User.findOne({ where: { email } });
    console.log('Usuário encontrado:', user);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar token.', details: error.message });
  }
};

// Obter um usuário pelo ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.', details: error.message });
  }
};

// Atualizar um usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, surname, email } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    await user.update({ firstname, surname, email });
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário.', details: error.message });
  }
};

// Deletar um usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    await user.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.', details: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

module.exports = {
  getUsers,
  createUser,
  generateToken,
  getUserById, 
  updateUser,
  deleteUser,
  getAllUsers,
};
