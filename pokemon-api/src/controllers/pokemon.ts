import { Request, Response } from "express";

// Constants
import { RESPONSE_STATUS } from "../constants/code";

// Services
import {
  createPokemon,
  deletePokemon,
  getAllPokemon,
  updatePokemon,
} from "../services/pokemon";

// Types
import { ErrorMessage } from "../types";

export const createAPokemon = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const payload = req.body;

  try {
    const result = createPokemon(payload);
    // Return result create pokemon item
    res.status(RESPONSE_STATUS.CREATED).json(result);
  } catch (error) {
    // Return error create pokemon item
    res.status((error as ErrorMessage).status).json(error);
  }
};

export const getPokemons = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await getAllPokemon();

    // Return result create pokemon item
    res.status(RESPONSE_STATUS.OK).json(result);
  } catch (error) {
    // Return error create pokemon item
    res.status((error as ErrorMessage).status).json(error);
  }
};
export const updateAPokemon = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const body = req.body;
    const result = await updatePokemon(id, body);

    // Return result create pokemon item
    res.status(RESPONSE_STATUS.OK).json(result);
  } catch (error) {
    // Return error create pokemon item
    res.status((error as ErrorMessage).status).json(error);
  }
};

export const deleteAPokemon = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const pokemonId = req.params.id;

  try {
    await deletePokemon(pokemonId);
    // Return result delete pokemon item
    res.status(RESPONSE_STATUS.NO_CONTENT).json();
  } catch (error) {
    // Return error delete pokemon item
    res.status((error as ErrorMessage).status).json(error);
  }
};
