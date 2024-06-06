import { Application } from "express";

// Controllers
import { getAllPokemonByType } from "../controllers/type";

// pokemon router
export const TypeRoute = (app: Application) => {
  app.route("/pokemon/type").get(getAllPokemonByType);
};
