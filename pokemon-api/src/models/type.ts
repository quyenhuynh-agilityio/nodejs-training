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
import { PokemonType } from "./pokemonType";

// Type Model: Represents the type of a Pokémon (e.g., Fire, Water).
@Table({
  timestamps: true,
  tableName: "types",
})
export class Type extends Model {
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

  @BelongsToMany(() => Pokemon, () => PokemonType)
  pokemons!: Pokemon[];
}
