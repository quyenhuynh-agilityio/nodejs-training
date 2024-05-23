// import bcrypt from "bcrypt";
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  // {
  //   hooks: {
  //     beforeCreate: (user) => {
  //       const salt = bcrypt.genSaltSync();
  //       user.password = bcrypt.hashSync(user.password, salt);
  //     },
  //   },
  // },
  {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Task);
      },
      // isPassword: (encodePassword, password) => {
      //   return bcrypt.compareSync(password, encodePassword);
      // },
    },
  }
);

module.exports = User;
