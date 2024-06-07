import { Pokemon } from "../../src/models/pokemon";
import { getPokemonByType } from "../../src/services/type";
import { Type } from "../../src/models/type";

jest.mock("../../src/models/type.ts");

describe("Pokemon API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return types with the specified name", async () => {
    const name = "Fire";
    const mockTypes = [
      {
        id: 1,
        name: "Fire",
        Pokemons: [{ id: 1, name: "Pikachu" }],
      },
    ];

    (Type.findAll as jest.Mock).mockResolvedValue(mockTypes);

    const result = await getPokemonByType(name);

    expect(Type.findAll).toHaveBeenCalledWith({
      where: { name },
      include: [Pokemon],
    });

    expect(result).toBe(mockTypes);
  });

  it("should return all types if no name is provided", async () => {
    const mockTypes = [
      {
        id: 1,
        name: "Fire",
        Pokemons: [{ id: 1, name: "Pikachu" }],
      },
      {
        id: 2,
        name: "Water",
        Pokemons: [{ id: 2, name: "Squirtle" }],
      },
    ];

    (Type.findAll as jest.Mock).mockResolvedValue(mockTypes);

    const result = await getPokemonByType("");

    expect(Type.findAll).toHaveBeenCalledWith({
      where: {},
      include: [Pokemon],
    });

    expect(result).toBe(mockTypes);
  });
});
