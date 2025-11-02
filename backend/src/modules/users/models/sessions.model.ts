import sequelize from "../../../config/db.ts";
import {
  DataTypes,
  Model,
  type CreateOptions,
  type DateDataType,
} from "sequelize";
import type { UUID } from "crypto";
import User from "./users.model.ts";

class Session extends Model {
  declare sessionId: CreateOptions<UUID>;
  declare userId: CreateOptions<UUID>;
  declare token: string;
  declare expiresAt: DateDataType;
  declare isRevoked: boolean;
}

Session.init(
  {
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "userId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isRevoked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Sessions",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["token"] },
      { fields: ["userId", "expiresAt", "isRevoked"] },
    ],
    sequelize,
  }
);

User.hasMany(Session, {
  foreignKey: "userId",
});

Session.belongsTo(User, {
  foreignKey: "userId",
});

export default Session;
