'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
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
      },
      password : {
          type : Sequelize.STRING(20),
          allowNull : false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  }
};
