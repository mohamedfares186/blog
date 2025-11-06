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
    },
    access: {
      type: DataTypes.ENUM("self", "admin", "anonymous"),
      allowNull: false,
      defaultValue: "anonymous",
    },
    category: {
      type: DataTypes.ENUM("user", "post", "comment"),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Permissions",
    timestamps: true,
    indexes: [
      { fields: ["action", "access"] },
      { unique: true, fields: ["category"] },
    ],
    sequelize,
  }
);

export default Permission;
