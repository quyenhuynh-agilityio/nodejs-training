import { Request, Response } from "express";
import "jest";

import { createPokemon } from "../../src/services/pokemon";
import { ERR_CODES, MESSAGES, RESPONSE_STATUS } from "../../src/constants";
import { createAPokemon } from "../../src/controllers/pokemon";

jest.mock("../../src/services/pokemon.ts");

describe("createAPokemon", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should create a new pokemon and return the result", async () => {
    const payload = {
      id: 1,
      name: "Pikachu",
      types: ["Electric"],
      levels: [5],
      skills: ["Thunder Shock"],
    };
    req.body = payload;

    const createdPokemon = { id: 1, name: "Pikachu" };
    (createPokemon as jest.Mock).mockResolvedValue(createdPokemon);

    await createAPokemon(req as Request, res as Response);

    expect(createPokemon).toHaveBeenCalledWith(payload);
    expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUS.CREATED);

    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it("should return an error if createPokemon throws an error", async () => {
    const payload = {
      name: "Pikachu",
      types: ["Electric"],
      levels: [5],
      skills: ["Thunder Shock"],
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
