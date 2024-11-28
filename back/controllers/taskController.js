const { Tareas } = require('../models'); // Asegúrate de que el modelo Tareas existe y está correctamente configurado

// Crear una tarea
exports.crearTarea = async (req, res) => {
  const { titulo, descripcion, negocioId } = req.body;

  try {
    const nuevaTarea = await Tareas.create({ titulo, descripcion, negocioId });
    res.status(201).json({ message: 'Tarea creada exitosamente', tarea: nuevaTarea });
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

// Obtener tareas por negocio
exports.obtenerTareasPorNegocio = async (req, res) => {
  const { negocioId } = req.params;

  try {
    const tareas = await Tareas.findAll({ where: { negocioId } });
    res.status(200).json({ tareas });
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
  const { id } = req.params;

  try {
    await Tareas.destroy({ where: { id } });
    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};
