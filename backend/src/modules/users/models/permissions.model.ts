import sequelize from "../../../config/db.ts";
import { DataTypes, Model } from "sequelize";
import type { UUID } from "crypto";

class Permission extends Model {
  declare permissionId: UUID;
  declare action: string;
  declare category: string;
  declare description: string;
}

Permission.init(
  {
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.ENUM("user", "post", "comment"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Permissions",
    timestamps: true,
    indexes: [{ unique: true, fields: ["action"] }, { fields: ["category"] }],
    sequelize,
  }
);

export default Permission;
