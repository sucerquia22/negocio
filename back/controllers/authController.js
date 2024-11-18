const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuarios } = require('../models'); // Importa el modelo de Usuarios
require('dotenv').config();

// Función para registrar un usuario
exports.register = async (req, res) => {
  try {
    const { nombre_completo, nombre_usuario, contrasena, rol } = req.body;

    // Validar si el usuario ya existe
    const usuarioExistente = await Usuarios.findOne({ where: { nombre_usuario } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
    }

    // Hashear la contraseña
    const contrasena_hash = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo usuario
    const usuario = await Usuarios.create({
      nombre_completo,
      nombre_usuario,
      contrasena_hash,
      rol,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro del usuario.', error });
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  try {
    const { nombre_usuario, contrasena } = req.body;

    // Buscar el usuario
    const usuario = await Usuarios.findOne({ where: { nombre_usuario } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña
    const esValida = await bcrypt.compare(contrasena, usuario.contrasena_hash);
    if (!esValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión.', error });
  }
};
