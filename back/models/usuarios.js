const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
      Usuarios.belongsTo(models.Negocios, { foreignKey: 'negocio_id', as: 'negocio' });
    }
  }

  Usuarios.init({
    nombreCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nombre_completo', // Mapeo con el nombre de la columna en la base de datos
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'nombre_usuario',
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'contrasena_hash', // Ajusta el nombre de la columna real aquí
    },
    negocioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'negocio_id',
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'personal',
    },
  }, {
    sequelize,
    modelName: 'Usuarios',
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
      },
    },
  });

  return Usuarios;
};
