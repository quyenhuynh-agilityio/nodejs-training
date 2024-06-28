// levelRoute.test.ts
import request from "supertest";
import express, { Application } from "express";
import { LevelRoute } from "../../src/routes/level"; // Adjust the import path accordingly
import { getAllPokemonByLevel } from "../../src/controllers/level";
import { RESPONSE_STATUS } from "../../src/constants";
// import { getAllPokemonByLevel } from "./controllers"; // Adjust the import path accordingly

jest.mock("../../src/controllers/level.ts", () => ({
  getAllPokemonByLevel: jest.fn(),
}));

describe("LevelRoute", () => {
  let app: Application;

  beforeAll(() => {
    app = express();
    LevelRoute(app);
  });

  it("should call getAllPokemonByLevel controller on GET /pokemon/level", async () => {
    (getAllPokemonByLevel as jest.Mock).mockImplementation((req, res) => {
      res.status(200).send("mocked response");
    });

    const response = await request(app).get("/pokemon/level");

    expect(response.status).toBe(RESPONSE_STATUS.OK);
    expect(response.text).toBe("mocked response");
    expect(getAllPokemonByLevel).toHaveBeenCalled();
  });
});
