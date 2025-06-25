//const { Perro } = require("../models/perro");
//const { Op } = require("sequelize");
//const {registrarLog } = require("../logs/logServices")

const perroService = require("../services/perroService")
const logger = require("../logs/logServices")

// Filtrar perros por letra inicial
const filtrarPorLetra = async (req, res) => {
  const { letra } = req.query;

  if (!letra || letra.length !== 1) {
    return res.status(400).json({ error: "Debes enviar una sola letra como parámetro 'letra'" });
  }

  try {
    const perros = await perroService.filtrarPorLetra(letra);
    res.json(perros);
  } catch (error) {
    console.error("Error al filtrar perros", error);
    res.status(500).json({ error: "Error al filtrar perros" });
  }
};

// Obtener todos los perros
const obtenerTodos = async (req, res) => {
  try {
    const perros = await perroService.obtenerTodos();
    res.json(perros);
  } catch (error) {
    console.error("Error al obtener los perros:", error);
    res.status(500).json({ error: "Error al obtener los perros" });
  }
};

// Crear un perro nuevo
const crearPerro = async (req, res) => {
  const { nombre, edad, raza, dueño } = req.body;

  if (!nombre || !edad || !raza || !dueño) {
    return res.status(400).json({ error: "Complete todos los campos" });
  }

  try {
    const crear = await perroService.crearPerro(req.body);
    logger.info(`🐶 Nuevo perro creado: ${crear.nombre} (${crear.id})`); // Info
    return res.status(201).json({ mensaje: "Se creó correctamente", data: crear });
  } catch (error) {
    logger.error(`❌ Error al crear perro: ${error.message}`); // Error
    return res.status(500).json({ error: "Error al crear el perro" });
  }
};

// Actualizar un perro
const actualizarPerro = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, raza, dueño } = req.body;

  if (!nombre || !edad || !raza || !dueño) {
    return res.status(400).json({ error: "Complete todos los campos" });
  }

  try {
    const [updated] = await perroService.actualizarPerro(id, { nombre, edad, raza, dueño });

    if (updated === 0) {
      return res.status(404).json({ error: "Perro no encontrado" });
    }

    const perroActualizado = await perroService.actualizarPerro(id);
    return res.status(200).json({ mensaje: "Perro actualizado", data: perroActualizado });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el perro" });
  }
};

// Eliminar un perro por nombre
const eliminarPerro = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "No se encontró el nombre" });
  }

  try {
    const eliminar = await perroService.eliminarPerro(nombre);

    if (eliminar === 0) {
        return res.status(404).json({ error: "No se encontró perro para eliminar" });
    }

    return res.status(200).json({ mensaje: "Se eliminó correctamente", eliminar });
    } catch (error) {
    console.error(error);
    return res.status(500).json({
        error: "No se eliminó exitosamente",
        mensaje: error.message
    });
    }
};

module.exports = {
  filtrarPorLetra,
  obtenerTodos,
  crearPerro,
  actualizarPerro,
  eliminarPerro
}