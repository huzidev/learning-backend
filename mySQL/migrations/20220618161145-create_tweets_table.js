'use strict';
// UP when we run the migration and table structure hasn't been migrated yet its just gonna grab this migration or the attribute
// we put inside is gonna submit to database
// basically UP is for running a migration,
// DOWN is for reverting a migration

//queryInterface allows us to create tables, columns and interacting with database
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("tweets", { // tweets is ours table name and second thing in object is ours actual schema
      id : {
        type : Sequelize.INTEGER(11),
        allowNull : false, // means required true
        autoIncrement : true,
        primaryKey : true
      },
      content : Sequelize.STRING(300),
      //createAt creates date and time inside of that attribute 
      createdAt : Sequelize.DATE,
      updatedAt : Sequelize.DATE,
      //updateAt will update date and time if we wanted to update anything
    })  
  },

  async down (queryInterface, Sequelize) {
  
  }
};
