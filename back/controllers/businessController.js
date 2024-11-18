const { Negocios, Usuarios } = require('../models');

// Crear un nuevo negocio
exports.createBusiness = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevoNegocio = await Negocios.create({ nombre });
    res.status(201).json({ message: 'Negocio creado exitosamente', negocio: nuevoNegocio });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el negocio', error });
  }
};

// Obtener todos los negocios
exports.getAllBusinesses = async (req, res) => {
  try {
    const negocios = await Negocios.findAll();
    res.json({ negocios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los negocios', error });
  }
};

// Actualizar un negocio
exports.updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const negocio = await Negocios.findByPk(id);
    if (!negocio) {
      return res.status(404).json({ message: 'Negocio no encontrado.' });
    }

    negocio.nombre = nombre;
    await negocio.save();

    res.json({ message: 'Negocio actualizado exitosamente', negocio });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el negocio', error });
  }
};

// Eliminar un negocio
exports.deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Negocios.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ message: 'Negocio no encontrado.' });
    }

    res.json({ message: 'Negocio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el negocio', error });
  }
};
