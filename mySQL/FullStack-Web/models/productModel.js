module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        image : {
            type : DataTypes.STRING, // because it'll just a path
        }
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        price : {
            type : DataTypes.INTEGER
        },
        description : {
            type : DataTypes.TEXT
        },
        published : {
            type : DataTypes.BOOLEAN
        }
    })

    return Product

}