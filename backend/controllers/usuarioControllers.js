//const { Usuario } = require("../models/usuario");
const bcrypt = require("bcryptjs");
//const { Op } = require("sequelize");
const usuarioService = require("../services/userService")

const filtrarLetraUsuario = async (req, res) => {
  const { letra } = req.query;

  if (!letra || letra.length !== 1) {
    return res.status(400).json({ error: "Debes enviar una sola letra como parámetro 'letra'" });
  }

    try {
      const usuario = await usuarioService.filtrarLetraUsuario(letra);
      res.json(usuario);
    } catch (error) {
      console.error("Error al filtrar perros", error);
      res.status(500).json({ error: "Error al filtrar perros" });
    }
}

const getUsuario = async (req, res) => {
  const { email, contraseña, nombre, apellido, nacimiento, dni, letra } = req.query;

  if (!email || !contraseña || !nombre || !apellido || !nacimiento || !dni) {
    return res.status(400).json({ error: "Error al obtener el usuario: faltan datos" });
  }

  if (!letra) {
    return res.status(400).json({ error: "Error al obtener la letra" });
  }

  try {
    // Buscar por letra en nombre
    const buscarLetra = await Usuario.findOne({
      where: { nombre: { [Op.like]: `%${letra}%` } }
    });

    // Buscar usuario exacto - importante: contraseña no debe buscarse así en texto plano
    const buscarUsuario = await usuarioService.getUsuario({ email });

    if (!buscarUsuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Validar contraseña con bcrypt
    //const validPassword = await bcrypt.compare(contraseña, buscarUsuario.contraseña);
    if (!contraseña) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    return res.status(200).json({
      mensaje: "Consulta realizada",
      resultado: {
        letra: buscarLetra,
        usuario: buscarUsuario
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se logró obtener el usuario" });
  }
};

const createUsuario = async (req, res) => {
  const { email, contraseña, nombre, apellido, nacimiento, dni } = req.body;

  if (!email || !contraseña || !nombre || !apellido || !nacimiento || !dni) {
    return res.status(400).json({ error: "Complete los campos" });
  }

  if (isNaN(Number(dni))) {
    return res.status(401).json({ error: "DNI debe ser numérico" });
  }

  const tieneNumero = /\d/;
  if (tieneNumero.test(nombre) || tieneNumero.test(apellido)) {
    return res.status(401).json({ error: "Nombre y apellido no pueden contener números" });
  }

  try {
    //const hashedPassword = await bcrypt.hash(contraseña, 10);

    const crear = await usuarioService.createUsuario(req.body);

    return res.status(201).json({ mensaje: "Usuario creado correctamente", crear });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se creó exitosamente", mensaje: error.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body; // ✅ Usa body, no query

  if (!email || !contraseña) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    // Busca solo por email
    const usuario = await usuarioService.loginUsuario({ email });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Compara la contraseña cifrada
    //const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!email && !contraseña) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Opcional: genera JWT aquí

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al iniciar sesión",
      mensaje: error.message
    });
  }
};


const updateUsuario = async (req, res) => {
  const { email, contraseña, nombre, apellido } = req.body;

  if (!email && !contraseña && !nombre && !apellido) {
    return res.status(400).json({ error: "No se enviaron datos para actualizar" });
  }

  try {
    /*let hashedPassword;
    if (contraseña) {
      hashedPassword = await bcrypt.hash(contraseña, 10);
    }*/

    const actualizar = await usuarioService.updateUsuario();

    if (actualizar[0] === 0) {
      return res.status(404).json({ error: "No se encontró usuario para actualizar" });
    }

    return res.status(200).json({ mensaje: "Actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se actualizó exitosamente", mensaje: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "No se encontró el email" });
  }

  try {
    const eliminar = await usuarioService.deleteUsuario({ where: { email } });

    if (eliminar === 0) {
      return res.status(404).json({ error: "No se encontró usuario para eliminar" });
    }

    return res.status(200).json({ mensaje: "Se eliminó correctamente", eliminar });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se eliminó exitosamente", mensaje: error.message });
  }
};

module.exports = {
  filtrarLetraUsuario,
  getUsuario,
  createUsuario,
  loginUsuario,
  updateUsuario,
  deleteUsuario,
};
