module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define("review", {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false, // means required true
            autoIncrement : true,
            primaryKey : true
        },
        rating : {
            type : DataTypes.INTEGER
        },
        description : {
            type : DataTypes.TEXT
        }
    })

    return Review

}