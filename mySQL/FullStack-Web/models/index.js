import { Sequelize, DataTypes } from "sequelize"; //datatypes are basically key ex tittle, price, description etc
import dbConfig from "../config/dbConfig";

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host : dbConfig.HOST,
        dialect : dbConfig.dialect,
        operatorsAliases : false,

        pool : {
            max : dbConfig.pool.max,
            min : dbConfig.pool.min,
            acquire : dbConfig.pool.acquire,
            idle : dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log("Failed to connect database " + err);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force : false })
.then(() => {
    console.log("Re-Sync done");
})
// if we didn't do this than every time we run the server the force will overwrite all the 
// data present in the table with new data and we don't want that until we really wanted it therefore it is necessary to use force : false

module.exports = db;