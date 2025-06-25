/*const fs = require('fs')
const path = require('path')

const logPath = path.join(__dirname, 'logs.txt')

function registrarLog(mensaje) {
    const fecha = new Date().toISOString
    const logFinal = `[${fecha}] ${mensaje}\n`

    fs.appendFile(logPath, logFinal, (err) => {
        if(err){
            console.error("Error al registrar log:", err)
        }
    })
}

module.exports = {
    registrarLog
}*/

// backend/logs/logger.js
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" })
  ],
});

module.exports = logger;
