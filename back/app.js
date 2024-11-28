require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');
const cors = require('cors');

// Middleware de CORS
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:5500'], // Lista de orígenes permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware para parsear JSON
app.use(express.json());

// Sincronizar la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const businessRoutes = require('./routes/businessRoutes');
const userRoutes = require('./routes/userRoutes');

// Configuración de rutas
app.use('/api/auth', authRoutes);
app.use('/api/tareas', taskRoutes);
app.use('/api/negocios', businessRoutes);
app.use('/api/usuarios', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
