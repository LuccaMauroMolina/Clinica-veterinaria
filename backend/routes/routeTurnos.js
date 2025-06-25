const express = require("express");
const router = express.Router();
const cors = require("cors");
/*const {
  getTurnos,
  createTurno,
  updateTurno,
  deleteTurno
} = require("../controllers/turnoController");*/
const turnoService = require("../controllers/turnosControllers")

router.use(cors());
router.use(express.json());

router.get("/api/turnos", turnoService.getTurnos);
router.post("/api/turnos", turnoService.createTurno);
router.put("/api/turnos", turnoService.updateTurno);
router.delete("/api/turnos", turnoService.deleteTurno);

module.exports = router;
