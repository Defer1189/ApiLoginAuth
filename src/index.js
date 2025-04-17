const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // 👈 Importar rutas

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Permite leer JSON

app.get('/', (req, res) => {
  res.send('🚀 API Login Auth funcionando');
});

// 👇 Usar rutas de auth
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
}); 