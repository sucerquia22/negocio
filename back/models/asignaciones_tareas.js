'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asignaciones_Tareas extends Model {
    static associate(models) {
      // Relación con Usuarios y Tareas
      Asignaciones_Tareas.belongsTo(models.Tareas, { foreignKey: 'tarea_id' });
      Asignaciones_Tareas.belongsTo(models.Usuarios, { foreignKey: 'usuario_id' });
    }
  }

  Asignaciones_Tareas.init({
    tarea_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    fecha_asignacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_completada: DataTypes.DATE,
    completada: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    sequelize,
    modelName: 'Asignaciones_Tareas',
  });

  return Asignaciones_Tareas;
};
