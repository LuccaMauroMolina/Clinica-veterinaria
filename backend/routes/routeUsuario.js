const express = require("express");
const router = express.Router();
const cors = require("cors");
const auth = require("../middlewares/auth");

/*const {
  filtrarLetraUsuario,
  getUsuario,
  createUsuario,
  loginUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarioController");*/
const usuarioService = require("../controllers/usuarioControllers")

//const userService = require("../services/userService");

router.post("/api/usuario", async (req, res) => {
  try {
    const usuario = await userService.crearUsuario(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.use(cors());
router.use(express.json());

router.get("/api/usuario", usuarioService.filtrarLetraUsuario);
router.get("/api/usuario", auth, usuarioService.getUsuario);
router.get("/api/usuario", usuarioService.loginUsuario);
router.post("/api/usuario", usuarioService.createUsuario);
router.put("/api/usuario", auth, usuarioService.updateUsuario);
router.delete("/api/usuario", auth, usuarioService.deleteUsuario);

module.exports = router;
