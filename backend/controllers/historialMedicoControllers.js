//const { historialMedico } = require("../models/historialMedico");
const historialService = require("../services/historialMedicoService")

const getHistorialMedico = async (req, res) => {
  const { tipo, descripcion, fecha, perroId } = req.query;

  try {
    const historial = await historialService.getHistorialMedico({ tipo, descripcion, fecha, perroId });

    return res.status(200).json({
      mensaje: "Historial médico obtenido correctamente",
      data: historial,
    });
  } catch (error) {
    console.error("Error al obtener historial médico:", error);
    return res.status(500).json({ error: "Error al obtener historial médico" });
  }
};

const createHistorialMedico = async (req, res) => {
  const { tipo, descripcion, fecha, perroId } = req.body;

  if (!tipo || !descripcion || !fecha || !perroId) {
    return res.status(400).json({ error: "Complete todos los campos" });
  }

  try {
    const crear = await historialService.createHistorialMedico({ tipo, descripcion, fecha, perroId });

    return res.status(201).json({
      mensaje: "Historial médico creado correctamente",
      data: crear,
    });
  } catch (error) {
    console.error("Error al crear historial médico:", error);
    return res.status(500).json({ error: "Error al crear historial médico" });
  }
};

module.exports = {
  getHistorialMedico,
  createHistorialMedico
};