'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
      // Relación con Negocios y Asignaciones de Tareas
      Usuarios.belongsTo(models.Negocios, { foreignKey: 'negocio_id' });
      Usuarios.hasMany(models.Asignaciones_Tareas, { foreignKey: 'usuario_id' });
    }
  }

  Usuarios.init({
    nombre_completo: { type: DataTypes.STRING, allowNull: false },
    nombre_usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    contrasena_hash: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [['Admin', 'Personal']] }},
    foto_perfil: DataTypes.TEXT,
    negocio_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Usuarios',
  });

  return Usuarios;
};
