import { Pokemon } from "../../src/models/pokemon";
import { sequelize } from "../../src/config/database";
import {
  createPokemon,
  deletePokemon,
  getAllPokemon,
  getPokemonById,
  updatePokemon,
} from "../../src/services/pokemon";
import { ERR_CODES, MESSAGES, RESPONSE_STATUS } from "../../src/constants";

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Pokemon.create({ name: "Pikachu" });
});

afterAll(async () => {
  await sequelize.close();
});

// Mocked data
const newPokemon = {
  name: "Pokemon",
  types: ["Water"],
  levels: [
    {
      level: "Basic",
      hp: 90,
    },
  ],
  skills: [
    {
      name: "Thunder Shock",
      score: 40,
      plus: false,
    },
    {
      name: "Quick Attack",
      score: 50,
      plus: true,
    },
  ],
};

describe("Pokemon API", () => {
  it("should get all pokemons", async () => {
    const foundPokemon = await getAllPokemon();

    expect(foundPokemon).toHaveLength(1);
  });

  it("should create new a pokemon", async () => {
    const createdPokemon = await createPokemon(newPokemon);
    expect(createdPokemon.name).toBe("Pokemon");
  });

  it("should throw an error if payload is not provided", async () => {
    try {
      await createPokemon(undefined);
    } catch (error) {
      expect(error).toEqual({
        message: MESSAGES.INVALID_PAYLOAD,
        status: RESPONSE_STATUS.INVALID_PARAM,
        errorCode: ERR_CODES.EC_BAD_REQUEST,
      });
    }
  });

  it("should update an existing Pokemon", async () => {
    const updatedData = {
      name: "Boguerisse",
      types: ["Fire"],
      levels: [
        {
          level: "Basic",
          hp: 90,
        },
      ],
      skills: [
        {
          name: "Thunder Shock",
          score: 40,
          plus: false,
        },
        {
          name: "Quick Attack",
          score: 50,
          plus: true,
        },
      ],
    };
    const updatedPokemon = await updatePokemon("1", updatedData);
    expect(updatedPokemon.name).toBe("Boguerisse");
  });

  // it("should throw an error if payload is not provided", async () => {
  //   try {
  //     await updatePokemon("1", undefined);
  //   } catch (error) {
  //     expect(error).toEqual({
  //       message: MESSAGES.INVALID_PAYLOAD,
  //       status: RESPONSE_STATUS.INVALID_PARAM,
  //       errorCode: ERR_CODES.EC_BAD_REQUEST,
  //     });
  //   }
  // });

  it("should delete a Pokemon", async () => {
    await deletePokemon("1");
    const pokemon = await getPokemonById(1);
    expect(pokemon).toBeNull();
  });
});
