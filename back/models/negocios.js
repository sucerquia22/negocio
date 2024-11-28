const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Negocios extends Model {}

  Negocios.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Negocios',
      tableName: 'negocios', // Nombre de la tabla en la base de datos
    }
  );

  return Negocios;
};
