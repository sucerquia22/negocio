'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tareas extends Model {
    static associate(models) {
      // Relación con Negocios y Asignaciones de Tareas
      Tareas.belongsTo(models.Negocios, { foreignKey: 'negocio_id' });
      Tareas.belongsTo(models.Usuarios, { foreignKey: 'asignado_por' });
      Tareas.hasMany(models.Asignaciones_Tareas, { foreignKey: 'tarea_id' });
    }
  }

  Tareas.init({
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: DataTypes.TEXT,
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_completada: DataTypes.DATE,
    estado: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [['Pendiente', 'En Progreso', 'Completada']] }},
    negocio_id: DataTypes.INTEGER,
    asignado_por: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tareas',
  });

  return Tareas;
};


