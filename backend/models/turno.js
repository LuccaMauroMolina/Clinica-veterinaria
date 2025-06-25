const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Turno = sequelize.define("Turno", {
    fecha: {
      type: DataTypes.DATE, // mejor usar DATE
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
    // NO agregar perroId acá
  });

  return Turno;
};
