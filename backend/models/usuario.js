const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Usuario = sequelize.define("Usuario", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Opcional, pero recomendable
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    nacimiento: DataTypes.DATE,
    dni: DataTypes.INTEGER // Mejor usar INTEGER en lugar de NUMBER
    });
    return Usuario;
};
