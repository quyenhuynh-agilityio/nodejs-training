// typeRoute.test.ts
import request from "supertest";
import express, { Application } from "express";
import { TypeRoute } from "../../src/routes/type"; // Adjust the import path accordingly
import { getAllPokemonByType } from "../../src/controllers/type"; // Adjust the import path accordingly
import { RESPONSE_STATUS } from "../../src/constants";

// Mock the controller
jest.mock("../../src/controllers/type.ts", () => ({
  getAllPokemonByType: jest.fn(),
}));

describe("TypeRoute", () => {
  let app: Application;

  beforeAll(() => {
    app = express();
    TypeRoute(app);
  });

  it("should call getAllPokemonByType controller on GET /pokemon/type", async () => {
    // Mock implementation of getAllPokemonByType controller
    (getAllPokemonByType as jest.Mock).mockImplementation((req, res) => {
      res.status(200).send("mocked response");
    });

    const response = await request(app).get("/pokemon/type");

    expect(response.status).toBe(RESPONSE_STATUS.OK);
    expect(response.text).toBe("mocked response");
    expect(getAllPokemonByType).toHaveBeenCalled();
  });
});
