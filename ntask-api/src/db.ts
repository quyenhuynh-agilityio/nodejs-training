import { Sequelize } from "sequelize";
import { config } from "./libs/config";
let sequelize = null;

export function db() {
  if (!sequelize) {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );
  }

  return sequelize;
}
