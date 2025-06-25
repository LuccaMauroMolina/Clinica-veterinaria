const {Sequelize} = require("sequelize")
const path = require("path")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../db.sqlite")
})

const Usuario = require("./usuario")(sequelize)
const Perro = require("./perro")(sequelize)
const Turno = require("./turno")(sequelize)
const HistorialMedico = require("./historialMedico")(sequelize)

Perro.hasMany(Turno)
Turno.belongsTo(Perro)

Perro.hasMany(HistorialMedico);
HistorialMedico.belongsTo(Perro);

module.exports = {
    sequelize,
    Usuario,
    Perro,
    Turno,
    HistorialMedico
}
