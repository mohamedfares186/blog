import type { UUID } from "crypto";
import sequelize from "../../../config/db.ts";
import { DataTypes, Model } from "sequelize";
import User from "../../users/models/users.model.ts";

class Post extends Model {
  declare postId: UUID;
  declare title: string;
  declare content: string;
  declare userId: UUID;
}

Post.init(
  {
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "userId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "Posts",
    timestamps: true,
    indexes: [{ fields: ["title"] }],
    sequelize,
  }
);

User.hasMany(Post, {
  foreignKey: "userId",
});

Post.belongsTo(User, {
  foreignKey: "userId",
});

export default Post;
