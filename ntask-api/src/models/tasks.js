const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Task = sequelize.define(
  "Task",
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    classMethods: {
      associate: (models) => {
        Tasks.belongsTo(models.Users);
      },
    },
  }
);

module.exports = Task;
