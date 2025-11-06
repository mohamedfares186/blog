import { Model, DataTypes, type DateDataType } from "sequelize";
import sequelize from "../../../config/db.ts";
import type { UUID } from "crypto";
import Role from "./roles.model.ts";

class User extends Model {
  declare userId: UUID;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare username: string;
  declare password: string;
  declare dateOfBirth: DateDataType;
  declare roleId: string;
  declare isVerified: boolean;
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Roles", key: "roleId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    indexes: [{ unique: true, fields: ["userId", "email", "username"] }],
    sequelize,
  }
);

Role.hasMany(User, {
  foreignKey: "roleId",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
});

export default User;
