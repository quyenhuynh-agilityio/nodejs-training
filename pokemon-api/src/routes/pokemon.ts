import { Application } from "express";

// Controllers
import {
  createAPokemon,
  deleteAPokemon,
  getPokemons,
  updateAPokemon,
} from "../controllers/pokemon";

// pokemon router
export const PokemonRoute = (app: Application) => {
  // Get all Pokemons with their types, levels, and skills
  // POST endpoint to create a new Pokemon
  app.route("/pokemons").get(getPokemons).post(createAPokemon);

  // Update/Delete a Pokemon
  app.route("/pokemons/:id").put(updateAPokemon).delete(deleteAPokemon);
};
