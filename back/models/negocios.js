'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Negocios extends Model {
    static associate(models) {
      // Relación con Usuarios y Tareas
      Negocios.hasMany(models.Usuarios, { foreignKey: 'negocio_id' });
      Negocios.hasMany(models.Tareas, { foreignKey: 'negocio_id' });
    }
  }

  Negocios.init({
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    sequelize,
    modelName: 'Negocios',
  });

  return Negocios;
};
