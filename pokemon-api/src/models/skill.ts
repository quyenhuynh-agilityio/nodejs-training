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
  timestamps: true,
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

  @ForeignKey(() => Pokemon)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pokemonId!: number;

  @BelongsTo(() => Pokemon)
  pokemon!: Pokemon;
}
