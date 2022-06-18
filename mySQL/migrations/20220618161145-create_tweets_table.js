'use strict';
// UP when we run the migration and table structure hasn't been migrated yet its just gonna grab this migration or the attribute
// we put inside is gonna submit to database
// basically UP is for running a migration,
// DOWN is for reverting a migration

//queryInterface allows us to create tables, columns and interacting with database
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("tweets", { // tweets is ours table name and second thing in object is ours actual schema
      id : {
        type : Sequelize.INTEGER(11),
        allowNull : false, // means required true
        autoIncrement : true,
        primaryKey : true
      },
      content : Sequelize.STRING(300),
      userId : Sequelize.INTEGER(11),
      //createAt creates date and time inside of that attribute 
      createdAt : Sequelize.DATE,
      updatedAt : Sequelize.DATE
      //updateAt will update date and time if we wanted to update anything
    })  
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("tweets"); // will simply delete a table and all rows in the table means it will delete entire structure and all the contents in it
  }
};
//make sure to use return
// sequelize sequelize db:migrate will helps us to migrate data and make sure to make changes in config.json like database name
// password and user
// make sure to change default database in cmd by using use (database name) EX use socialnetwork;
// then describe (name of table created) EX describe tweets;
// if we wanted to make some changes and wanted to migrate all the data to database but already all the data was migrated then 
// we can use sequelize db:migrate:undo (for last migration) and sequelize db:migrate:undo:all (for all the migration) we've done