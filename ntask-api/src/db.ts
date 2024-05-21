import { Sequelize } from "sequelize";
import { config } from "./libs/config";

const db = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  params: config.params,
});

export default db;
