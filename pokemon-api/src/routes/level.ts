import { Application } from "express";

// Controllers
import { getAllPokemonByLevel } from "../controllers/level";

// pokemon router
export const LevelRoute = (app: Application) => {
  app.route("/pokemon/level").get(getAllPokemonByLevel);
};
