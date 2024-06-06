import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from "sequelize-typescript";

// Models
import { Pokemon } from "./pokemon";
import { PokemonLevel } from "./pokemonLevel";

// Level Model: Represents the level of a Pokémon.
@Table({
  timestamps: true,
  tableName: "levels",
})
export class Level extends Model {
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
  level!: string;

  @BelongsToMany(() => Pokemon, () => PokemonLevel)
  pokemons!: Pokemon[];
}
