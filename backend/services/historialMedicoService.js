const { historialMedico } = require("../models/historialMedico");


exports.getHistorialMedico = async ({ tipo, descripcion, fecha, perroId }) => {
    return await historialMedico.findAll({
      where: {
        ...(tipo && { tipo }),
        ...(descripcion && { descripcion }),
        ...(fecha && { fecha }),
        ...(perroId && { perroId }),
      },
    });
}

exports.createHistorialMedico = async ({ tipo, descripcion, fecha, perroId }) => {
    return await historialMedico.create({
      tipo,
      descripcion,
      fecha,
      perroId,
    });
}