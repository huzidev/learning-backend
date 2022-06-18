'use strict';
// UP when we run the migration and table structure hasn't been migrated yet its just gonna grab this migration or the attribute
// we put inside is gonna submit to database
// basically UP is for running a migration,
// DOWN is for reverting a migration
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
