// FOR MYSQL
module.exports = ( sequelize, DataTypes ) => { // we are not importing sequelize therefore we've used sequelize with small s
    const Review = sequelize.define("review", {
        rid : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        rating : {
            type : DataTypes.INTEGER
        },
        description : {
            type : DataTypes.TEXT
        },
        pid : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    })
    return Review
}