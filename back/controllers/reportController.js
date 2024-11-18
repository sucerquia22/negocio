const { Tareas, Usuarios, Negocios } = require('../models');

// Informe de progreso general para el administrador
exports.getGeneralProgressReport = async (req, res) => {
  try {
    const negocios = await Negocios.findAll({
      include: [
        {
          model: Tareas,
          attributes: ['estado']
        }
      ]
    });

    const informe = negocios.map(negocio => {
      const totalTareas = negocio.Tareas.length;
      const completadas = negocio.Tareas.filter(t => t.estado === 'Completada').length;
      const enProgreso = negocio.Tareas.filter(t => t.estado === 'En Progreso').length;
      const pendientes = negocio.Tareas.filter(t => t.estado === 'Pendiente').length;

      return {
        negocio: negocio.nombre,
        totalTareas,
        completadas,
        enProgreso,
        pendientes,
        progreso: totalTareas === 0 ? 0 : Math.round((completadas / totalTareas) * 100)
      };
    });

    res.json({ informe });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el informe general', error });
  }
};

// Informe de progreso del usuario
exports.getUserProgressReport = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const tareas = await Tareas.findAll({ where: { asignado_por: usuario_id } });
    const totalTareas = tareas.length;
    const completadas = tareas.filter(t => t.estado === 'Completada').length;
    const enProgreso = tareas.filter(t => t.estado === 'En Progreso').length;
    const pendientes = tareas.filter(t => t.estado === 'Pendiente').length;

    res.json({
      totalTareas,
      completadas,
      enProgreso,
      pendientes,
      progreso: totalTareas === 0 ? 0 : Math.round((completadas / totalTareas) * 100)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el informe del usuario', error });
  }
};

// Informe detallado por negocio
exports.getBusinessDetailReport = async (req, res) => {
  try {
    const { negocio_id } = req.params;

    const negocio = await Negocios.findByPk(negocio_id, {
      include: [
        {
          model: Tareas,
          include: [
            {
              model: Usuarios,
              attributes: ['nombre_completo', 'nombre_usuario']
            }
          ]
        }
      ]
    });

    if (!negocio) {
      return res.status(404).json({ message: 'Negocio no encontrado' });
    }

    const tareas = negocio.Tareas.map(t => ({
      titulo: t.titulo,
      descripcion: t.descripcion,
      estado: t.estado,
      asignado_a: t.Usuario ? t.Usuario.nombre_completo : 'No asignado'
    }));

    res.json({
      negocio: negocio.nombre,
      totalTareas: tareas.length,
      tareas
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el informe detallado del negocio', error });
  }
};
