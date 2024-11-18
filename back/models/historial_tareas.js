module.exports = (sequelize, DataTypes) => {
  const Historial_Tareas = sequelize.define('Historial_Tareas', {
    tarea_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tareas',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
      allowNull: true,
    },
    actividad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Historial_Tareas;
};
