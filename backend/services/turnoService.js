const { Turno } = require("../models/turno");
const { Op } = require("sequelize");

exports.getTurnos = async({hora, fecha}) => {
    return await Turno.findAll({
        where: {
            [Op.and]: [{ hora }, { fecha }]
        }
    });
}

exports.createTurno = async({hora, fecha, estado}) => {
    await Turno.create({ hora, fecha, estado });
}

exports.updateTurno = async({hora, fecha}) => {
    const [updated] = await Turno.update(
        { estado: estadoNuevo },
        { where: { [Op.and]: [{ hora }, { fecha }] } }
    );
}

exports.deleteTurno = async({fecha}) => {
    return await Turno.destroy({ where: { fecha } });
}

