import type { UUID } from "crypto";
import sequelize from "../../../config/db.ts";
import { Model, DataTypes } from "sequelize";
import Post from "../../posts/models/post.model.ts";
import User from "../../users/models/users.model.ts";

class Comment extends Model {
  declare commentId: UUID;
  declare content: string;
  declare postId: UUID;
  declare userId: UUID;
}

Comment.init(
  {
    commentId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Posts", key: "postId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
    tableName: "Comments",
    timestamps: true,
    sequelize,
  }
);

Post.hasMany(Comment, {
  foreignKey: "postId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

export default Comment;
