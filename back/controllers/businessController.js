const { Negocios } = require('../models'); // Asegúrate de que el modelo Negocios está correctamente configurado

// Obtener todos los negocios
exports.obtenerNegocios = async (req, res) => {
  try {
    const negocios = await Negocios.findAll();
    res.status(200).json({ negocios });
  } catch (error) {
    console.error('Error al obtener negocios:', error);
    res.status(500).json({ message: 'Error al obtener negocios', error });
  }
};

// Crear un nuevo negocio
exports.crearNegocio = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevoNegocio = await Negocios.create({ nombre });
    res.status(201).json({ message: 'Negocio creado exitosamente', negocio: nuevoNegocio });
  } catch (error) {
    console.error('Error al crear negocio:', error);
    res.status(500).json({ message: 'Error al crear negocio', error });
  }
};

// Eliminar un negocio por ID
exports.eliminarNegocio = async (req, res) => {
  const { id } = req.params;

  try {
    await Negocios.destroy({ where: { id } });
    res.status(200).json({ message: 'Negocio eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar negocio:', error);
    res.status(500).json({ message: 'Error al eliminar negocio', error });
  }
};
