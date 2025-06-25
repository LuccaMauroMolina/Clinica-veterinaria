// middlewares/errorHandler.js
const logger = require("../logs/logServices");

module.exports = (err, req, res, next) => {
    logger.error(`❌ ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Internal Server Error" });
};
