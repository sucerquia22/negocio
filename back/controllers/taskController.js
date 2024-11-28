const { Tareas, Usuarios } = require('../models');

// Obtener tareas por negocio
exports.obtenerTareasPorNegocio = async (req, res) => {
  const { negocioId } = req.params;

  try {
    const tareas = await Tareas.findAll({
      where: { negocioId },
      include: {
        model: Usuarios,
        attributes: ['id', 'nombreCompleto'],
      },
    });

    res.status(200).json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas por negocio:', error);
    res.status(500).json({ message: 'Error al obtener tareas', error });
  }
};

// Completar tarea
exports.completarTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tareas.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    tarea.completada = true;
    await tarea.save();

    res.status(200).json({ message: 'Tarea completada exitosamente', tarea });
  } catch (error) {
    console.error('Error al completar tarea:', error);
    res.status(500).json({ message: 'Error al completar tarea', error });
  }
};
