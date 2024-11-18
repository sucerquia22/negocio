const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  // Obtén el token del header de autorización
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado.' });
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda los datos del usuario decodificado en la solicitud
    next(); // Continua hacia el controlador de la ruta protegida
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = verifyToken;
