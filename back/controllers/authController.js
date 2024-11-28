const { Usuarios } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    const usuario = await Usuarios.findOne({ where: { nombreUsuario: nombre_usuario } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', usuario, token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

exports.register = async (req, res) => {
  const { nombreCompleto, nombreUsuario, contrasena, negocioId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await Usuarios.create({
      nombreCompleto,
      nombreUsuario,
      contrasena: hashedPassword,
      negocioId,
      rol: 'personal', // Por defecto, el rol es 'personal'
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
