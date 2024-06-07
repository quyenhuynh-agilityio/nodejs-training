import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";

// Models
import { Type } from "./type";
import { Level } from "./level";
import { Skill } from "./skill";
import { PokemonType } from "./pokemonType";
import { PokemonLevel } from "./pokemonLevel";

// Pokemon Model: This represents the Pokémon entity
@Table({
  timestamps: false,
  tableName: "pokemons",
})
export class Pokemon extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Type, () => PokemonType)
  types!: Type[];

  @BelongsToMany(() => Level, () => PokemonLevel)
  levels!: Level[];

  @HasMany(() => Skill)
  skills!: Skill[];
}
