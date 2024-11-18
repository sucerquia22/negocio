require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');

// Sincronizar la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

app.use(express.json()); // Middleware para parsear JSON

// Importar middleware de autenticación
const verifyToken = require('./middlewares/authMiddleware');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const businessRoutes = require('./routes/businessRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tareas', taskRoutes);
app.use('/api/negocios', businessRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/informes', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Ejemplo de una ruta protegida
app.get('/api/protegida', verifyToken, (req, res) => {
  res.json({
    message: 'Acceso permitido a ruta protegida',
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
