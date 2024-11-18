const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController'); // Importa el controlador
const verifyToken = require('../middlewares/authMiddleware');

// Dashboard para usuarios
router.get('/usuario/:usuario_id', verifyToken, dashboardController.getUserDashboard);

// Dashboard para administradores
router.get('/admin', verifyToken, dashboardController.getAdminDashboard);

module.exports = router;
