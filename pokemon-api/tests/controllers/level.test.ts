import { Request, Response } from "express";
import "jest";

// Services
import { getPokemonByLevel } from "../../src/services/level";

// Constants
import { ERR_CODES, MESSAGES, RESPONSE_STATUS } from "../../src/constants";

// Controllers
import { getAllPokemonByLevel } from "../../src/controllers/level";

jest.mock("../../src/services/level.ts");

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

  describe("Get Pokemons by level", () => {
    it("should get pokemon list by level and return the result", async () => {
      const level = "Basic";
      const allPokemonsByLevel = [
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

      req.query = { level: "Basic" };
      (getPokemonByLevel as jest.Mock).mockResolvedValue(allPokemonsByLevel);

      await getAllPokemonByLevel(req as Request, res as Response);

      expect(getPokemonByLevel).toHaveBeenCalledWith(level);
      expect(getPokemonByLevel).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(allPokemonsByLevel);
    });

    it("should return an error if getPokemons by level throws an error", async () => {
      const error = {
        message: MESSAGES.INVALID_PAYLOAD,
        status: RESPONSE_STATUS.INVALID_PARAM,
        errorCode: ERR_CODES.EC_BAD_REQUEST,
      };

      req.query = { level: "Basic" };
      (getPokemonByLevel as jest.Mock).mockRejectedValue(error);

      await getAllPokemonByLevel(req as Request, res as Response);

      expect(getPokemonByLevel).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.INVALID_PARAM);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});
