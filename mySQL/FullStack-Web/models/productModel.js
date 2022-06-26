
module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false, // means required true
            autoIncrement : true,
            primaryKey : true
        },
        image : {
            type : DataTypes.STRING // because it'll just a path and we'll use multer for uploading files(img)
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
        },
        published : {
            type : DataTypes.BOOLEAN
        }
    })

    return Product

}