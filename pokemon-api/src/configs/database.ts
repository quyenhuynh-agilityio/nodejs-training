import { Sequelize } from "sequelize-typescript";

// Models
import { Pokemon } from "../models/pokemon";
import { Type } from "../models/type";
import { Level } from "../models/level";
import { PokemonType } from "../models/pokemonType";
import { PokemonLevel } from "../models/pokemonLevel";
import { Skill } from "../models/skill";

// Initialize Sequelize to use SQLite
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `../database.sqlite`,
  models: [Pokemon, Type, Level, PokemonType, PokemonLevel, Skill],
});
