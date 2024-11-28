const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController'); // Asegúrate de importar el controlador

// Definir rutas
router.get('/', businessController.obtenerNegocios); // Obtener todos los negocios
router.post('/', businessController.crearNegocio); // Crear un nuevo negocio
router.delete('/:id', businessController.eliminarNegocio); // Eliminar un negocio por ID

module.exports = router;
