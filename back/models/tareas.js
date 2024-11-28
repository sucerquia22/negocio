const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tareas extends Model {}

  Tareas.init(
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      negocioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tareas',
      tableName: 'tareas', // Nombre de la tabla en la base de datos
    }
  );

  return Tareas;
};
