export interface PokemonLevelsTypes {
  level: string;
  hp: number;
}

export interface PokemonEnergyTypes {
  name: string;
}

export interface PokemonSkillsTypes {
  name: string;
  score: number;
}

export interface PokemonTypes {
  name: string;
  types: string[];
  levels: PokemonLevelsTypes[];
  skills: PokemonSkillsTypes[];
}
