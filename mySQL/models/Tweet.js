import { Sequelize } from "sequelize";

module.exports = sequelize.define("Tweet", { // will take the name of model we wanted to create Tweet is basically a table(document)

//all the schema attribute inside their is going to represent  column to this table tweet
    id : {
        type : Sequelize.INTEGER(11),
        allowNull : false, // means required true
        autoIncrement : true,
        primaryKey : true
    },
    content : Sequelize.STRING(300),

});