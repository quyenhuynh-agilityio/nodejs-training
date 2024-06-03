import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

// Models
import { Pokemon } from "./pokemon";
import { Type } from "./type";

// PokemonType Model: This is the join table for the many-to-many relationship between Pokemon and Type.
@Table({
  timestamps: false,
  tableName: "pokemon_types",
})
export class PokemonType extends Model {
  @ForeignKey(() => Pokemon)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pokemonId!: number;

  @ForeignKey(() => Type)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  typeId!: number;
}
