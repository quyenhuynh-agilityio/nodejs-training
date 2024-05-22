import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

import { config } from "./libs/config.js";
import { TasksModel } from "./models/tasks.js";
import { UsersModel } from "./models/users.js";

let connectDB = null;
const __dirname = path.resolve();

export function db(app) {
  if (!connectDB) {
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );
    connectDB = {
      sequelize,
      Sequelize,
      models: {},
    };
    const dir = path.join(__dirname, "src/models");

    fs.readdirSync(dir).forEach((file) => {
      const model = {
        Tasks: TasksModel(sequelize, Sequelize.DataTypes),
        Users: UsersModel(sequelize, Sequelize.DataTypes),
      };

      connectDB.models = model;
    });

    Object.keys(connectDB.models).forEach((key) => {
      if ("associate" in connectDB.models[key]) {
        connectDB.models[key].associate(connectDB.models);
      }
    });
  }
  return connectDB;
}
