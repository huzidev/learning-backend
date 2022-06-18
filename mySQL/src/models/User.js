import { Sequelize } from "sequelize";

module.exports = sequelize.define("User", {

    id : {
        type : Sequelize.INTEGER(11),
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    username : {
        type : Sequelize.STRING(25),
        allowNull : false,
        unique : true, // so each username must be unique not same
    }
});