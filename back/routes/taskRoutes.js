const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Obtener tareas por negocio
router.get('/negocio/:negocioId', taskController.obtenerTareasPorNegocio);

// Completar tarea
router.patch('/:id/completar', taskController.completarTarea);

module.exports = router;
