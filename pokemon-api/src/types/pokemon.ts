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
  types: string[];
  levels: number[];
  skills: string[];
}
