import sequelize from "../../../config/db.ts";
import { DataTypes, Model } from "sequelize";
import type { UUID } from "crypto";

class Role extends Model {
  declare roleId: UUID;
  declare title: string;
  declare level: number;
  declare description: string;
}

Role.init(
  {
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "user",
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      defaultValue: 1234,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Roles",
    timestamps: true,
    indexes: [{ unique: true, fields: ["title", "level"] }],
    sequelize,
  }
);

export default Role;
