"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("pokemons", "tag", {
      type: Sequelize.STRING,
      allowNull: true, // Adjust this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("pokemons", "tag");
  },
};
