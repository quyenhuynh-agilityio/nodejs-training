// Models
import { Pokemon } from "../models/pokemon";

// Types
import { Type } from "../models/type";

export const getPokemonByType = async (name: string) => {
  const types = await Type.findAll({
    where: name ? { name: name } : {}, // Apply filter if name is provided,
    include: [Pokemon],
  });

  return types;
};
