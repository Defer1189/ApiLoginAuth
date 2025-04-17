// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Crear token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Registrar usuario
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ message: 'Usuario registrado', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login usuario
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user);
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};