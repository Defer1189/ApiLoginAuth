// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware'); // 👈 Importar middleware

// Ruta para registro
router.post('/register', register);

// Ruta para login
router.post('/login', login);

// Ruta privada protegida
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Acceso autorizado a perfil privado',
    userId: req.user.id, // Esto viene del token decodificado
  });
});

module.exports = router;