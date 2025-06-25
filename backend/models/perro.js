const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Perro = sequelize.define("Perro", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        raza: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dueño: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })

    

    return Perro
}