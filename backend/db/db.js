const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "sqlite",
        storage: "./db.sqlite",
        logging: false
    }
)

module.exports = sequelize


/*const {Sequelize} = require("sequelize")


const sequelize = new Sequelize({
    dialect:"sqlite",
    storage: "./database.sqlite"
})


module.exports = sequelize;
*/