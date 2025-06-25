const {createLogger, transports, format } = require("winston")

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({filename: "logs/error.log", level: "error"}),
        new transports.File({filename: "logs7/combined.log"})
    ],
})

module.exports = logger