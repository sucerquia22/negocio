const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Importa el controlador

// Definir rutas
router.post('/', taskController.crearTarea); // Crear tarea
router.get('/:negocioId', taskController.obtenerTareasPorNegocio); // Obtener tareas por negocio
router.delete('/:id', taskController.eliminarTarea); // Eliminar tarea

module.exports = router;
