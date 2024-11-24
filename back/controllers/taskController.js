const { Tareas, Asignaciones_Tareas, Usuarios, Historial_Tareas } = require('../models');


// Asignar una tarea a un usuario
exports.assignTaskToUser = async (req, res) => {
  try {
    const { tarea_id, usuario_id } = req.body;

    const tarea = await Tareas.findByPk(tarea_id);
    const usuario = await Usuarios.findByPk(usuario_id);

    if (!tarea || !usuario) {
      return res.status(404).json({ message: 'Tarea o usuario no encontrado.' });
    }

    const asignacion = await Asignaciones_Tareas.create({
      tarea_id,
      usuario_id,
      fecha_asignacion: new Date(),
    });

    res.json({ message: 'Tarea asignada exitosamente', asignacion });
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar la tarea', error });
  }
};

// Ver las tareas asignadas a un usuario específico
exports.getAssignedTasks = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const tareas = await Asignaciones_Tareas.findAll({
      where: { usuario_id },
      include: [{ model: Tareas, attributes: ['titulo', 'descripcion', 'estado'] }],
    });

    res.json({ tareas });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas asignadas', error });
  }
};

// Marcar una tarea asignada como completada
exports.markTaskAsCompleted = async (req, res) => {
  try {
    const { tarea_id, usuario_id } = req.body;

    const asignacion = await Asignaciones_Tareas.findOne({
      where: { tarea_id, usuario_id },
    });

    if (!asignacion) {
      return res.status(404).json({ message: 'Asignación de tarea no encontrada.' });
    }

    asignacion.completada = true;
    asignacion.fecha_completada = new Date();
    await asignacion.save();

    res.json({ message: 'Tarea marcada como completada', asignacion });
  } catch (error) {
    res.status(500).json({ message: 'Error al marcar la tarea como completada', error });
  }
};

// Función para registrar una actividad en el historial de tareas
const logActivity = async (tarea_id, usuario_id, actividad) => {
  await Historial_Tareas.create({
    tarea_id,
    usuario_id,
    actividad,
  });
};

// Cambiar el estado de una tarea y registrar en el historial
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, usuario_id } = req.body; // usuario_id se envía para registrar quién hizo el cambio

    // Encuentra la tarea
    const tarea = await Tareas.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    // Registrar el cambio de estado en el historial
    const actividad = `Cambio de estado a ${estado}`;
    await logActivity(id, usuario_id, actividad);

    // Actualizar el estado de la tarea
    tarea.estado = estado;
    await tarea.save();

    res.json({ message: 'Estado de la tarea actualizado', tarea });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de la tarea', error });
  }
};

// Obtener el historial de una tarea específica
exports.getTaskHistory = async (req, res) => {
  try {
    const { tarea_id } = req.params;

    // Buscar en historial_tareas por tarea_id
    const historial = await Historial_Tareas.findAll({ where: { tarea_id } });

    res.json({ historial });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial de la tarea', error });
  }
};

// Filtrar tareas según criterios específicos
exports.filterTasks = async (req, res) => {
  try {
    const { estado, asignado_por, negocio_id } = req.query;

    // Construir la consulta con los filtros proporcionados
    const where = {};
    if (estado) where.estado = estado; // Filtro por estado
    if (asignado_por) where.asignado_por = asignado_por; // Filtro por usuario asignado
    if (negocio_id) where.negocio_id = negocio_id; // Filtro por negocio

    // Consultar las tareas
    const tareas = await Tareas.findAll({ where });
    res.json({ tareas });
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar las tareas', error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const tarea = await Tareas.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    await tarea.destroy();
    res.json({ message: 'Tarea eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea.', error });
  }
};


