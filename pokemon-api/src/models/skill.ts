import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

// Models
import { Pokemon } from "./pokemon";

// Skill Model: Represents the skills a Pokémon can have
@Table({
  timestamps: false,
  tableName: "skills",
})
export class Skill extends Model {
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  score!: number;

  @ForeignKey(() => Pokemon)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pokemonId!: number;
}
