const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

// Rutas de usuarios protegidas
router.post('/crear', verifyToken, userController.createUser); // Crear usuario
router.get('/:negocio_id', verifyToken, userController.getUsersByBusiness); // Obtener usuarios de un negocio

module.exports = router;
