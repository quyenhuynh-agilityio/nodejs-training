"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('pokemon_types', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("pokemon_types", {
      pokemonId: Sequelize.INTEGER,
      typeId: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('pokemon_types');
     */
    await queryInterface.dropTable("pokemon_types");
  },
};
