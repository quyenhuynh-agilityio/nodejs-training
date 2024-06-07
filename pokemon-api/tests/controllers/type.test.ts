import { Request, Response } from "express";
import "jest";

// Constants
import { ERR_CODES, MESSAGES, RESPONSE_STATUS } from "../../src/constants";

// Controllers

import { getPokemonByType } from "../../src/services/type";
import { getAllPokemonByType } from "../../src/controllers/type";

jest.mock("../../src/services/type.ts");

describe("Pokemon Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Get Pokemons by types", () => {
    it("should get pokemon list by types and return the result", async () => {
      const type = "Fire";
      const allPokemonsByType = [
        {
          id: 1,
          name: "Pikachu",
          types: ["Electric"],
          levels: ["Basic"],
          skills: ["Thunder Shock"],
        },
        {
          id: 2,
          name: "Charmander",
          types: ["Fire"],
          levels: ["Basic"],
          skills: ["Ember"],
        },
      ];

      req.query = { name: "Fire" };
      (getPokemonByType as jest.Mock).mockResolvedValue(allPokemonsByType);

      await getAllPokemonByType(req as Request, res as Response);

      expect(getPokemonByType).toHaveBeenCalledWith(type);
      expect(getPokemonByType).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(allPokemonsByType);
    });

    it("should return an error if getPokemons by type throws an error", async () => {
      const error = {
        message: MESSAGES.INVALID_PAYLOAD,
        status: RESPONSE_STATUS.INVALID_PARAM,
        errorCode: ERR_CODES.EC_BAD_REQUEST,
      };

      req.query = { level: "Fire" };
      (getPokemonByType as jest.Mock).mockRejectedValue(error);

      await getAllPokemonByType(req as Request, res as Response);

      expect(getPokemonByType).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.INVALID_PARAM);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});
