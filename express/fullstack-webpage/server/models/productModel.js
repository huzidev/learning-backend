// FOR MYSQL
module.exports = ( sequelize, DataTypes ) => { // we are not importing sequelize therefore we've used sequelize with small s
    const Product = sequelize.define("product", {
        pid : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        image : {
            type : DataTypes.STRING
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        price : {
            type : DataTypes.INTEGER
        },
        description : {
            type : DataTypes.TEXT
        }
    })
    return Product
}