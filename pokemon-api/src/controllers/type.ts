import { Request, Response } from "express";

import { RESPONSE_STATUS } from "../constants";
import { getPokemonByType } from "../services/type";
import { ErrorMessage } from "../types";

export const getAllPokemonByType = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const name: string | null = <string>req.query.name; // Example filter parameter
    const result = await getPokemonByType(name);

    // Return result create pokemon item
    res.status(RESPONSE_STATUS.OK).json(result);
  } catch (error) {
    // Return error create pokemon item
    res.status((error as ErrorMessage).status).json(error);
  }
};
