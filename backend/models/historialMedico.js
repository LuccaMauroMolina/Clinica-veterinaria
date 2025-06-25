const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const HistorialMedico = sequelize.define("HistorialMedico", {
        tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    // ⚠️ NO pongas perroId aquí si vas a usar associations
  });
    HistorialMedico.associate = (models) => {
    HistorialMedico.belongsTo(models.Perro);
  };

  return HistorialMedico;
}





