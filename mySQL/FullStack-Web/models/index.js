import { Sequelize, DataTypes } from "sequelize";
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