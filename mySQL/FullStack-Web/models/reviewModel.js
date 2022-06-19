module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define("review", {
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