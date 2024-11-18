const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Asegúrate de que la ruta es correcta

const verifyToken = require('../middlewares/authMiddleware');

// Define las rutas para asignar, ver y completar tareas
router.post('/asignar', verifyToken, taskController.assignTaskToUser);
router.get('/usuario/:usuario_id/asignadas', verifyToken, taskController.getAssignedTasks);
router.put('/marcar-completada', verifyToken, taskController.markTaskAsCompleted);
router.get('/:tarea_id/historial', verifyToken, taskController.getTaskHistory);
router.get('/filtrar', verifyToken, taskController.filterTasks);



module.exports = router;

