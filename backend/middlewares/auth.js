const jwt = require("jsonwebtoken");
const logger = require("../logs/logServices");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    logger.warn("Token no proporcionado");
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    logger.error(`Token inválido: ${error.message}`);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = auth;
