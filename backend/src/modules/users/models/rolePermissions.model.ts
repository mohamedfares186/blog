import sequelize from "../../../config/db.ts";
import { DataTypes, Model } from "sequelize";
import type { UUID } from "crypto";
import Role from "./roles.model.ts";
import Permission from "./permissions.model.ts";

class RolePermission extends Model {
  declare roleId: UUID;
  declare permissionId: UUID;
}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Roles", key: "roleId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Permissions", key: "permissionId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "Role_Permission",
    timestamps: true,
    indexes: [{ unique: true, fields: ["roleId", "permissionId"] }],
    sequelize,
  }
);

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permissionId",
  otherKey: "roleId",
});

export default RolePermission;
