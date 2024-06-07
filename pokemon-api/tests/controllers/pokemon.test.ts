import { Request, Response } from "express";
import "jest";

// Services
import {
  createPokemon,
  deletePokemon,
  getAllPokemon,
  getPokemonById,
  updatePokemon,
} from "../../src/services/pokemon";

// Constants
import { ERR_CODES, MESSAGES, RESPONSE_STATUS } from "../../src/constants";

// Controllers
import {
  createAPokemon,
  deleteAPokemon,
  getAPokemonById,
  getPokemons,
  updateAPokemon,
} from "../../src/controllers/pokemon";

jest.mock("../../src/services/pokemon.ts");

describe("Pokemon Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: {
        name: "Pikachu",
        types: ["Electric"],
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
          },
          {
            name: "Quick Attack",
            score: 50,
          },
        ],
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Create Pokemon", () => {
    it("should create a new pokemon and return the result", async () => {
      const payload = {
        name: "Pikachu",
        types: ["Electric"],
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
          },
          {
            name: "Quick Attack",
            score: 50,
          },
        ],
      };
      req.body = payload;

      const createdPokemon = { id: 1, name: "Pikachu" };
      (createPokemon as jest.Mock).mockResolvedValue(createdPokemon);

      await createAPokemon(req as Request, res as Response);
      const result = createPokemon(payload);
      expect(createPokemon).toHaveBeenCalledWith(payload);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.CREATED);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it("should return an error if createPokemon throws an error", async () => {
      const payload = {
        name: "Pikachu",
        types: ["Electric"],
        levels: [5],
        skills: [
          {
            name: "Thunder Shock",
            score: 40,
          },
          {
            name: "Quick Attack",
            score: 50,
          },
        ],
      };
      req.body = payload;

      const error = {
        message: MESSAGES.INVALID_PAYLOAD,
        status: RESPONSE_STATUS.INVALID_PARAM,
        errorCode: ERR_CODES.EC_BAD_REQUEST,
      };
      (createPokemon as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await createAPokemon(req as Request, res as Response);

      expect(createPokemon).toHaveBeenCalledWith(payload);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.INVALID_PARAM);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("Get Pokemons", () => {
    it("should get pokemon list and return the result", async () => {
      const allPokemons = [
        {
          id: 1,
          name: "Pikachu",
          types: ["Electric"],
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
            },
            {
              name: "Quick Attack",
              score: 50,
            },
          ],
        },
        {
          id: 2,
          name: "Charmander",
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
            },
            {
              name: "Quick Attack",
              score: 50,
            },
          ],
        },
      ];

      (getAllPokemon as jest.Mock).mockResolvedValue(allPokemons);

      await getPokemons(req as Request, res as Response);

      expect(getAllPokemon).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(allPokemons);
    });

    it("should return an error if getPokemons throws an error", async () => {
      const error = {
        message: MESSAGES.INVALID_PAYLOAD,
        status: RESPONSE_STATUS.INVALID_PARAM,
        errorCode: ERR_CODES.EC_BAD_REQUEST,
      };
      (getAllPokemon as jest.Mock).mockRejectedValue(error);

      await getPokemons(req as Request, res as Response);

      expect(getAllPokemon).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.INVALID_PARAM);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("Get Pokemon By id", () => {
    it("should get pokemon by id and return the result", async () => {
      const allPokemons = [
        {
          id: 1,
          name: "Pikachu",
          types: ["Electric"],
          levels: [
            {
              level: "Basic",
              hp: 90,
            },
          ],
          skills: ["Thunder Shock"],
        },
        {
          id: 2,
          name: "Charmander",
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
            },
            {
              name: "Quick Attack",
              score: 50,
            },
          ],
        },
      ];

      (getPokemonById as jest.Mock).mockResolvedValue(allPokemons);

      await getAPokemonById(req as Request, res as Response);

      expect(getPokemonById).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(allPokemons);
    });

    it("should return an error if getAPokemonById throws an error", async () => {
      const error = {
        message: MESSAGES.INVALID_PAYLOAD,
        status: RESPONSE_STATUS.INVALID_PARAM,
        errorCode: ERR_CODES.EC_BAD_REQUEST,
      };
      (getPokemonById as jest.Mock).mockRejectedValue(error);

      await getAPokemonById(req as Request, res as Response);

      expect(getPokemonById).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.INVALID_PARAM);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("Update Pokemon", () => {
    it("should update a pokemon and return the result", async () => {
      const updatedPokemon = {
        id: "1",
        name: "Pikachu",
        types: ["Electric"],
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
          },
          {
            name: "Quick Attack",
            score: 50,
          },
        ],
      };

      (updatePokemon as jest.Mock).mockResolvedValue(updatedPokemon);

      await updateAPokemon(req as Request, res as Response);

      expect(updatePokemon).toHaveBeenCalledWith("1", req.body);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(updatedPokemon);
    });

    it("should return an error if updatePokemon throws an error", async () => {
      const error = {
        message: MESSAGES.INVALID_PAYLOAD,
        status: RESPONSE_STATUS.INVALID_PARAM,
        errorCode: ERR_CODES.EC_BAD_REQUEST,
      };

      const payload = {
        name: "Pikachu",
        types: ["Electric"],
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
          },
          {
            name: "Quick Attack",
            score: 50,
          },
        ],
      };

      req.body = payload;

      req.params = { id: "1" };
      (updatePokemon as jest.Mock).mockRejectedValue(error);

      await updateAPokemon(req as Request, res as Response);

      expect(updatePokemon).toHaveBeenCalledWith("1", payload);
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.INVALID_PARAM);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("Delete Pokemon", () => {
    it("should delete a pokemon and return the result", async () => {
      const updatedPokemon = {
        id: "1",
        name: "Pikachu",
        types: ["Electric"],
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
          },
          {
            name: "Quick Attack",
            score: 50,
          },
        ],
      };

      (deletePokemon as jest.Mock).mockResolvedValue(updatedPokemon);

      await deleteAPokemon(req as Request, res as Response);

      expect(deletePokemon).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.NO_CONTENT);
      // expect(res.json).toHaveBeenCalledWith(updatedPokemon);
    });

    it("should return an error if deletePokemon throws an error", async () => {
      const error = {
        message: MESSAGES.INVALID_PAYLOAD,
        status: RESPONSE_STATUS.NO_CONTENT,
        errorCode: ERR_CODES.EC_BAD_REQUEST,
      };
      (deletePokemon as jest.Mock).mockRejectedValue(error);

      await deleteAPokemon(req as Request, res as Response);

      expect(deletePokemon).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.NO_CONTENT);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});
