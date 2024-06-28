import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Pokemon } from "./pokemon";
import { Level } from "./level";

// PokemonLevel Model: This is the join table for the many-to-many relationship between Pokemon and Level.
@Table({
  timestamps: false,
  tableName: "pokemon_levels",
})
export class PokemonLevel extends Model {
  @ForeignKey(() => Pokemon)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pokemonId!: number;

  @ForeignKey(() => Level)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  levelId!: number;
}
