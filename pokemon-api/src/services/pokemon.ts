// Models
import { Level } from "../models/level";
import { Pokemon } from "../models/pokemon";
import { Skill } from "../models/skill";

// Constant
import { MESSAGES, RESPONSE_STATUS, ERR_CODES } from "../constants";

// Types
import { Type } from "../models/type";
import { PokemonTypes } from "../types";

export const getAllPokemon = async () => {
  const pokemons = await Pokemon.findAll({
    include: [Type, Level, Skill],
  });

  return pokemons;
};

export const createPokemon = async (payload: PokemonTypes) => {
  if (!payload) {
    // Return error if not have payload
    throw {
      message: MESSAGES.INVALID_PAYLOAD,
      status: RESPONSE_STATUS.INVALID_PARAM,
      errorCode: ERR_CODES.EC_BAD_REQUEST,
    };
  } else {
    const { name, types, levels, skills } = payload;

    const pokemon = await Pokemon.create({ name });

    if (types && types.length > 0) {
      for (const typeName of types) {
        const [type] = await Type.findOrCreate({
          where: { name: typeName },
        });
        await pokemon.$add("types", type);
      }
    }

    if (levels && levels.length > 0) {
      for (const level of levels) {
        const [lvl] = await Level.findOrCreate({
          where: { level },
        });
        await pokemon.$add("levels", lvl);
      }
    }

    if (skills && skills.length > 0) {
      for (const skill of skills) {
        await Skill.create({ name: skill, pokemonId: pokemon.id });
      }
    }
    return pokemon;
  }
};
export const updatePokemon = async (
  id: string,
  body: Pokemon,
): Promise<Pokemon> => {
  const { name, types, levels, skills } = body;

  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    // Return error if not have payload
    throw {
      message: MESSAGES.INVALID_PAYLOAD,
      status: RESPONSE_STATUS.INVALID_PARAM,
      errorCode: ERR_CODES.EC_BAD_REQUEST,
    };
  }

  pokemon.name = name;
  await pokemon.save();

  if (types) {
    const newTypes = await Promise.all(
      types.map(async (typeName) => {
        const [type] = await Type.findOrCreate({
          where: { name: typeName },
        });
        return type;
      }),
    );
    await pokemon.$set("types", newTypes);
  }

  if (levels) {
    const newLevels = await Promise.all(
      levels.map(async (levelNumber) => {
        const [level] = await Level.findOrCreate({
          where: { level: levelNumber },
        });
        return level;
      }),
    );
    await pokemon.$set("levels", newLevels);
  }

  if (skills) {
    await Skill.destroy({ where: { pokemonId: pokemon.id } });
    await Promise.all(
      skills.map(async (skillName) => {
        await Skill.create({ name: skillName, pokemonId: pokemon.id });
      }),
    );
  }
  return pokemon;
};

export const deletePokemon = async (pokemonId: string): Promise<number> => {
  // Delete pokemon item
  const pokemon = await Pokemon.destroy({
    where: {
      id: pokemonId,
    },
  });

  // Return result after delete pokemon item
  return pokemon;
};
