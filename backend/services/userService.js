// services/userService.js
const { Usuario } = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");


exports.filtrarLetraUsuario = async ({nombre, edad, raza, dueño}) => {
  return await Perro.findAll({
    where: {
        nombre: {
        [Op.like]: `${letra}%`
        }
    }
    });
}

exports.getUsuario = async ({email, contraseña, letra}) => {
  const buscarLetra = await Usuario.findOne({
      where: { nombre: { [Op.like]: `%${letra}%` } }
    });
    const buscarUsuario = await Usuario.findOne({ where: { email } });
  const bcrypted = await bcrypt.compare(contraseña, buscarUsuario.contraseña);
  return buscarLetra, buscarUsuario, bcrypted
}


exports.createUsuario = async (data) => {
  const hashed = await bcrypt.hash(data.contraseña, 10);
  return Usuario.create({ ...data, contraseña: hashed });
}

exports.loginUsuario = async (email, contraseña) => {
  const user = await Usuario.findOne({ where: { email } });
  if (!user) return null;

  const match = await bcrypt.compare(contraseña, user.contraseña);
  return match ? user : null;
}

exports.updateUsuario = async ({email, contraseña}) => {
  let hashedPassword;
      if (contraseña) {
        hashedPassword = await bcrypt.hash(contraseña, 10);
      }
  await Usuario.update(
      {
        ...(email && { email }),
        ...(contraseña && { contraseña: hashedPassword }),
        ...(nombre && { nombre }),
        ...(apellido && { apellido })
      },
      {
        where: { email } // Asumo que el email del usuario autenticado está en req.usuarioEmail
      }
    );
}

exports.deleteUsuario = async ({email}) => {
  await Usuario.destroy({ where: { email } });
}

