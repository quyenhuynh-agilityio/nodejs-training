export interface PokemonLevelsTypes {
  level: number;
}

export interface PokemonEnergyTypes {
  name: string;
}

export interface PokemonSkillsTypes {
  name: string;
}

export interface PokemonTypes {
  name: string;
  types: PokemonEnergyTypes[];
  levels: PokemonLevelsTypes[];
  skills: PokemonSkillsTypes[];
}
