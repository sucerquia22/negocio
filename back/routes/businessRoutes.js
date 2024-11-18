const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const verifyToken = require('../middlewares/authMiddleware'); // Middleware de autenticación

// Rutas de negocios protegidas
router.post('/crear', verifyToken, businessController.createBusiness); // Crear negocio
router.get('/', verifyToken, businessController.getAllBusinesses); // Obtener todos los negocios
router.put('/actualizar/:id', verifyToken, businessController.updateBusiness); // Actualizar negocio
router.delete('/eliminar/:id', verifyToken, businessController.deleteBusiness); // Eliminar negocio

module.exports = router;
