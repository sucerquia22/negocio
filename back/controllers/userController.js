const { Usuarios } = require('../models');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombreCompleto, nombreUsuario, contrasena, negocioId } = req.body;

    const usuario = await Usuarios.create({
      nombreCompleto,
      nombreUsuario,
      contrasena,
      negocioId,
      rol: 'personal',
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    res.json({ usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuarios.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.destroy();
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
