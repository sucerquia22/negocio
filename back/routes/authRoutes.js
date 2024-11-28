const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Asegúrate de que este archivo existe y exporta correctamente

// Rutas de autenticación
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
