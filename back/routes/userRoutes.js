const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de usuarios
router.post('/', userController.registrarUsuario); // Crear usuario
router.get('/', userController.obtenerUsuarios); // Obtener todos los usuarios
router.delete('/:id', userController.eliminarUsuario); // Eliminar usuario

module.exports = router;
