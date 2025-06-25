const express = require("express");
const router = express.Router();
const cors = require("cors");
/*const {
    getHistorialMedico,
    createHistorialMedico,
} = require("../controllers/historialMedicoController");7*/
const historialService = require("../controllers/historialMedicoControllers")

router.use(cors());
router.use(express.json());

router.get("/api/historialmedico", historialService.getHistorialMedico);
router.post("/api/historialmedico", historialService.createHistorialMedico);

module.exports = router;
