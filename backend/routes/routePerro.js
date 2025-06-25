const express = require("express");
const router = express.Router();
const perroService = require("../controllers/perroControllers");
const cors = require("cors");

router.use(cors());
router.use(express.json());

// Usamos las funciones del controlador
router.get("/", perroService.obtenerTodos);
router.get("/filtrar", perroService.filtrarPorLetra);
router.post("/", perroService.crearPerro);
router.put("/:nombre", perroService.actualizarPerro);
router.delete("/:nombre", perroService.eliminarPerro);

module.exports = router;
