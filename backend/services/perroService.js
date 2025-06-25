const { Perro } = require("../models/perro");
const { Op } = require("sequelize");

exports.crearPerro = async ({ nombre, edad, raza, dueño }) => {
    return await Perro.create({ nombre, edad, raza, dueño });
};

exports.obtenerTodos = async () => {
    return await Perro.findAll();
};

exports.filtrarPorLetra = async (letra) => {
    return await Perro.findAll({
    where: {
        nombre: {
        [Op.like]: `${letra}%`
        }
    }
    });
};

exports.actualizarPerro = async (nombre, data) => {
    const [updated] = await Perro.update(data, { where: { nombre } });
    return updated;
};

exports.eliminarPerro = async (nombre) => {
    return await Perro.destroy({ where: { nombre } });
};
