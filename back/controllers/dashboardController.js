const { sequelize } = require('../models');
const { Negocios, Usuarios, Tareas } = require('../models');

// Dashboard para usuarios
exports.getUserDashboard = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const tareasPendientes = await Tareas.count({
      where: { asignado_por: usuario_id, estado: 'Pendiente' },
    });

    const tareasCompletadas = await Tareas.count({
      where: { asignado_por: usuario_id, estado: 'Completada' },
    });

    res.json({
      usuario_id,
      tareasPendientes,
      tareasCompletadas,
    });
  } catch (error) {
    console.error('Error al obtener el dashboard del usuario:', error);
    res.status(500).json({ message: 'Error al obtener el dashboard del usuario', error });
  }
};

// Dashboard para administradores
exports.getAdminDashboard = async (req, res) => {
  try {
    const tareasPorNegocio = await Negocios.findAll({
      attributes: ['id', 'nombre'],
      include: [
        {
          model: Tareas,
          attributes: [
            'estado',
            [sequelize.fn('COUNT', sequelize.col('Tareas.estado')), 'total'],
          ],
        },
      ],
      group: ['Negocios.id', 'Tareas.estado'],
    });

    const usuariosPorRol = await Usuarios.findAll({
      attributes: ['rol', [sequelize.fn('COUNT', sequelize.col('rol')), 'total']],
      group: ['rol'],
    });

    res.json({
      tareasPorNegocio,
      usuariosPorRol,
    });
  } catch (error) {
    console.error('Error al obtener el dashboard del administrador:', error);
    res.status(500).json({ message: 'Error al obtener el dashboard del administrador', error });
  }
};
