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
// db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force : false })
.then(() => {
    console.log("Re-Sync done");
})
// if we didn't do this than every time we run the server the force will overwrite all the 
// data present in the table with new data and we don't want that until we really wanted it therefore it is necessary to use force : false

// one to many relations for single product their can be thousands of reviews

db.products.hasMany(db.reviews, { // to tell with which table we want it to be linked with
    foreignKey : 'product_id',// to specify with which product's id the review are going to set
    as : 'review'
    // ProductId : {
    //     type : DataTypes.INTEGER,
    //     References : 'products',
    //     ReferenceKey : 'Id',
    // }
})

products.hasMany(db.reviews);

// var Product = sequelize.define('Product', {
//     name : DataTypes.STRING
// })


// var reviews = sequelize.define('reviews', {
//     productId : {
//         type : DataTypes.INTEGER,
//         references :  'products', // table name
//         referencesKey : 'id' // primary key of that products table
//     }
// })

// db.products.hasMany(reviews);

// and we've already define product and review models


// var products = sequelize.define('products', {
//     ReviewId : {
//         type : DataTypes.INTEGER,
//         references : 'reviews',
//         referencesKey : 'id'
//     }
// })

// reviews.belongsTo(products);

db.reviews.belongsTo(db.products, {
    foreignKey : 'product_id',
    as : 'product'
    // ReviewsId : {
    //     type : DataTypes.INTEGER,
    //     References : 'reviews',
    //     ReferenceKey : 'Id',
    // }
})

reviews.belongsTo(db.products);

module.exports = db;