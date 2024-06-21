"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("pokemons", {
      id: Sequelize.INTEGER,
      name: Sequelize.STRING,
      // types: Sequelize.ARRAY,
      // levels: Sequelize.ARRAY,
      // skills: Sequelize.ARRAY,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("pokemons");
  },
};
