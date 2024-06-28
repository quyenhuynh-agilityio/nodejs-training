// Models
import { Level } from "../models/level";
import { Pokemon } from "../models/pokemon";

export const getPokemonByLevel = async (level: string) => {
  const levels = await Level.findOne({
    where: { level },
    include: [Pokemon],
  });

  return levels;
};
