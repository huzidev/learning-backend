// FOR MYSQL
import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/dbConfig';

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
    console.log("Can't connect to database" + err);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes) // inside bracket we've same parameters as we used in product and reviews schema or models
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)