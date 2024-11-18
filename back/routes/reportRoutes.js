const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const verifyToken = require('../middlewares/authMiddleware');

// Rutas para informes
router.get('/general', verifyToken, reportController.getGeneralProgressReport); // Informe general
router.get('/usuario/:usuario_id', verifyToken, reportController.getUserProgressReport); // Informe del usuario
router.get('/negocio/:negocio_id', verifyToken, reportController.getBusinessDetailReport); // Informe detallado de negocio

module.exports = router;
