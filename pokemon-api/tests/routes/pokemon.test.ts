// levelRoute.test.ts
import request from "supertest";
import express, { Application } from "express";
import { PokemonRoute } from "../../src/routes/pokemon"; // Adjust the import path accordingly
import { getPokemons } from "../../src/controllers/pokemon";
import { RESPONSE_STATUS } from "../../src/constants";

jest.mock("../../src/controllers/pokemon.ts", () => ({
  getPokemons: jest.fn(),
  createAPokemon: jest.fn(),
  getAPokemonById: jest.fn(),
  updateAPokemon: jest.fn(),
  deleteAPokemon: jest.fn(),
}));

describe("PokemonRoute", () => {
  let app: Application;

  beforeAll(() => {
    app = express();
    PokemonRoute(app);
  });

  it("should call getPokemons controller on GET /pokemons", async () => {
    (getPokemons as jest.Mock).mockImplementation((req, res) => {
      res.status(200).send("mocked response");
    });

    const response = await request(app).get("/pokemons");

    expect(response.status).toBe(RESPONSE_STATUS.OK);
    expect(response.text).toBe("mocked response");
    expect(getPokemons).toHaveBeenCalled();
  });
});
