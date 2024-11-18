const bcrypt = require('bcryptjs');
const { Usuarios, Negocios } = require('../models');

// Crear un usuario y asignarlo a un negocio
exports.createUser = async (req, res) => {
  try {
    const { nombre_completo, nombre_usuario, contrasena, rol, negocio_id } = req.body;

    // Hashear la contraseña antes de guardarla
    const contrasena_hash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await Usuarios.create({
      nombre_completo,
      nombre_usuario,
      contrasena_hash,
      rol,
      negocio_id
    });

    res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios de un negocio
exports.getUsersByBusiness = async (req, res) => {
  try {
    const { negocio_id } = req.params;

    const usuarios = await Usuarios.findAll({ where: { negocio_id } });
    res.json({ usuarios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};
