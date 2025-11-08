import { Op } from "sequelize";
import User from "../../users/models/users.model.ts";
import UserRepository from "../../users/repositories/contract/users.repository.ts";
import Role from "../../users/models/roles.model.ts";
import type { RegisterCredentials } from "../../../types/credentials.ts";

class UserRepoImpl extends UserRepository {
  public override async create(user: RegisterCredentials): Promise<User> {
    const { firstName, lastName, email, username, password, dateOfBirth } =
      user;
    const defaultRole = await Role.findOne({
      where: { title: "user" },
      attributes: ["roleId"],
    });

    if (!defaultRole) {
      throw new Error("Default user role is not defined");
    }

    const roleId = defaultRole.roleId;

    return await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      roleId,
      dateOfBirth,
    });
  }

  public override async findUnsafe(
    user: RegisterCredentials
  ): Promise<User | null> {
    const { email, username } = user;
    return await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
      attributes: {
        include: ["password"],
      },
      include: [
        {
          model: Role,
          attributes: ["level"],
        },
      ],
    });
  }

  public override async findSafe(userId: string): Promise<User | null> {
    return await User.findOne({ where: { userId } });
  }

  public override async findByUsername(
    username: string | undefined
  ): Promise<User | null> {
    return await User.findOne({
      where: { username },
      attributes: {
        include: ["password"],
      },
      include: [
        {
          model: Role,
          attributes: ["level"],
        },
      ],
    });
  }
  public override async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: { email },
    });
  }

  public override async update(
    password: string,
    userId: string
  ): Promise<[number]> {
    return await User.update({ password }, { where: { userId } });
  }
}

export default UserRepoImpl;
