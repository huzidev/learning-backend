// FOR MYSQL
import { Sequelize, DataTypes, Model } from 'sequelize';
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

const db = {} // we'll export db after creating relation of it with every instances

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes) // inside bracket we've same parameters as we used in product and reviews schema or models
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force : false })
.then(() => {
    console.log("Re-Sync done");
})
// if we didn't do this than every time we run the server the force will overwrite all the 
// data present in the table with new data and we don't want that until we really wanted it therefore it is necessary to use force : false

db.products.hasMany(db.reviews, {
    as : 'review',
    foreignKey : 'pid'
})

db.reviews.belongsTo(db.products, {
    as : 'product',
    foreignKey : 'pid'
})

module.exports = db;