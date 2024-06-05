import request from "supertest";
import { app } from "../../src/index";
import { Pokemon } from "../../src/models/pokemon";
import { sequelize } from "../../src/configs/database";
import {
  createPokemon,
  deletePokemon,
  getAllPokemon,
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
  name: "Boguerisse",
  types: ["Water"],
  levels: [10],
  skills: ["Thunder Shock", "Quick Attack"],
};

describe("Pokemon API", () => {
  it("should get all pokemons", async () => {
    const foundPokemon = await getAllPokemon();

    expect(foundPokemon).toHaveLength(1);
  });

  it("should create new a pokemon", async () => {
    const createdPokemon = await createPokemon(newPokemon);
    console.log("newPokemon", newPokemon);

    console.log("createdPokemon", createdPokemon);

    expect(createdPokemon.name).toBe("Boguerisse");
  });
  // it('Invalid payload', async () => {
  //   // Call the function with empty payload
  //   await expect(createPokemon()).rejects.toEqual({
  //     message: MESSAGES.INVALID_PAYLOAD,
  //     status: RESPONSE_STATUS.INVALID_PARAM,
  //     errorCode: ERR_CODES.EC_BAD_REQUEST,
  //   });

  //   // Assertions
  //   expect(Pokemon.create).not.toHaveBeenCalled(); // Ensure Pokemon.create is not called

  // it("should update an existing Pokemon", async () => {
  //   const updatedData = {
  //     name: "Boguerisse",
  //     types: ["Fire"],
  //     levels: ["basic"],
  //     skills: ["Thunder Shock", "Quick Attack"],
  //   };
  //   const updatedPokemon = await updatePokemon("1", updatedData);
  //   expect(updatedPokemon.types).toBe("Fire");
  // });

  // it("should delete a Pokemon", async () => {
  //   await deletePokemon("1");
  //   // const pokemon = await getAllPokemon("1");
  //   // expect(pokemon).toBeNull();
  // });
});
