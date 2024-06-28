import { Request, Response } from "express";

import { RESPONSE_STATUS } from "../constants";
import { ErrorMessage } from "../types";
import { getPokemonByLevel } from "../services/level";

export const getAllPokemonByLevel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const level: string | null = <string>req.query.level; // Example filter parameter

    const result = await getPokemonByLevel(level);

    // Return result create pokemon item
    res.status(RESPONSE_STATUS.OK).json(result);
  } catch (error) {
    // Return error create pokemon item
    res.status((error as ErrorMessage).status).json(error);
  }
};
