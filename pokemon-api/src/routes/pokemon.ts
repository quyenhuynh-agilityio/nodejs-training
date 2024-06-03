import { Application } from "express";

import { Pokemon } from "../models/pokemon";
import { Type } from "../models/type";
import { Level } from "../models/level";
import { Skill } from "../models/skill";

// User router
export const PokemonRoute = (app: Application) => {
  // CRUD operations for Pokemon
  app.get("/pokemons", async (req, res) => {
    const pokemons = await Pokemon.findAll({ include: [Type, Level, Skill] });
    res.status(201).json(pokemons);
  });

  // app.get("/pokemons", async (req, res) => {
  //   const pokemons = await Pokemon.findAll({ include: [Type, Level, Skill] });
  //   res.json(pokemons);
  // });

  // app.get("/pokemons/:id", async (req, res) => {
  //   const pokemon = await Pokemon.findByPk(req.params.id, {
  //     include: [Type, Level, Skill],
  //   });
  //   if (pokemon) {
  //     res.json(pokemon);
  //   } else {
  //     res.status(404).send("Pokemon not found");
  //   }
  // });

  // app.post("/pokemons", async (req, res) => {
  //   const pokemon = await Pokemon.create(req.body);
  //   res.json(pokemon);
  // });

  // app.put("/pokemons/:id", async (req, res) => {
  //   const pokemon = await Pokemon.findByPk(req.params.id);
  //   if (pokemon) {
  //     await pokemon.update(req.body);
  //     res.json(pokemon);
  //   } else {
  //     res.status(404).send("Pokemon not found");
  //   }
  // });

  // app.delete("/pokemons/:id", async (req, res) => {
  //   const pokemon = await Pokemon.findByPk(req.params.id);
  //   if (pokemon) {
  //     await pokemon.destroy();
  //     res.status(204).send();
  //   } else {
  //     res.status(404).send("Pokemon not found");
  //   }
  // });
};
