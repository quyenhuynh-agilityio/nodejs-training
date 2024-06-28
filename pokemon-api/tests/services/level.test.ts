// Import the necessary modules and functions

import { Level } from "../../src/models/level";
import { Pokemon } from "../../src/models/pokemon";
import { getPokemonByLevel } from "../../src/services/level";

// Mock the models
jest.mock("../../src/models/level.ts");

describe("getPokemonByLevel", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return levels with the specified level", async () => {
    // Define the level to be tested
    const level = "5";
    // Mock data for the Level model
    const mockLevels = {
      id: 1,
      level: "Basic",
      Pokemons: [
        { id: 1, name: "Pikachu" },
        { id: 2, name: "Charmander" },
      ],
    };

    // Mock the Level.findOne method to return the mock data
    (Level.findOne as jest.Mock).mockResolvedValue(mockLevels);

    // Call the function with the specified level
    const result = await getPokemonByLevel(level);

    // Check that Level.findOne was called with the correct arguments
    expect(Level.findOne).toHaveBeenCalledWith({
      where: { level },
      include: [Pokemon],
    });

    // Check that the result is the mock data
    expect(result).toBe(mockLevels);
  });

  it("should return null if no levels are found", async () => {
    // Define the level to be tested
    const level = "Basic";

    // Mock the Level.findOne method to return null
    (Level.findOne as jest.Mock).mockResolvedValue(null);

    // Call the function with the specified level
    const result = await getPokemonByLevel(level);

    // Check that Level.findOne was called with the correct arguments
    expect(Level.findOne).toHaveBeenCalledWith({
      where: { level },
      include: [Pokemon],
    });

    // Check that the result is null
    expect(result).toBeNull();
  });
});
