import { Application } from "express";

// Controllers
import { getAllPokemonByType } from "../controllers/type";

// pokemon router
export const TypeRoute = (app: Application) => {
  app.route("/types").get(getAllPokemonByType);
};
