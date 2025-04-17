// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica si el token viene en el header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado o mal formado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda info del token en req.user
    next(); // Pasa al siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;