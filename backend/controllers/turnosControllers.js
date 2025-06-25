//const { Turno } = require("../models/turno");
//const { Op } = require("sequelize");
const turnoService = require("../services/turnoService")


const getTurnos = async (req, res) => {
  const { hora, fecha } = req.query;

  if (!hora || !fecha) {
    return res.status(400).json({ error: "Faltan parámetros: hora o fecha" });
  }

  try {
    const turnos = await turnoService.getTurnos(hora, fecha)

    res.status(200).json({
      mensaje: "Se obtuvieron correctamente los turnos",
      turnos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los turnos", detalle: error.message });
  }
};

const createTurno = async (req, res) => {
  const { hora, fecha, estado } = req.body;

  if (!hora || !fecha || estado === undefined) {
    return res.status(400).json({ error: "Complete los datos que faltan" });
  }

  try {
    const turno = await turnoService.createTurno(hora, fecha, estado);
    res.status(201).json({ mensaje: "Turno creado correctamente", turno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear el turno", mensaje: error.message });
  }
};

const updateTurno = async (req, res) => {
  const { hora, fecha, estadoNuevo } = req.body;

  if (!hora || !fecha || estadoNuevo === undefined) {
    return res.status(400).json({ error: "Faltan datos: hora, fecha o nuevo estado" });
  }

  try {
    const [updated] = await turnoService.updateTurno({hora, fecha, estadoNuevo})

    if (updated === 0) {
      return res.status(404).json({ mensaje: "No se encontró un turno para actualizar" });
    }

    res.status(200).json({ mensaje: "Se actualizó correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar", mensaje: error.message });
  }
};

const deleteTurno = async (req, res) => {
  const { fecha } = req.body;

  if (!fecha) {
    return res.status(400).json({ error: "Falta la fecha" });
  }

  try {
    const eliminado = await turnoService.deleteTurno(fecha)
    if (eliminado === 0) {
      return res.status(404).json({ error: "No se encontró un turno para borrar" });
    }

    res.status(200).json({ mensaje: "Se eliminó correctamente", eliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo eliminar", mensaje: error.message });
  }
};

module.exports = {
  getTurnos,
  createTurno,
  updateTurno,
  deleteTurno
};
