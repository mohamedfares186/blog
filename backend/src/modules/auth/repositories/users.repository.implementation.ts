import { Op } from "sequelize";
import User from "../../users/models/users.model.ts";
import UserRepository from "../../users/repositories/contract/users.repository.ts";
import type { UserType } from "../../../types/user.ts";
import Role from "../../users/models/roles.model.ts";

class UserRepoImpl extends UserRepository {
  public override async create(user: UserType): Promise<User> {
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

  public override async findSafe(user: UserType): Promise<User | null> {
    const { email, username } = user;
    return await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
      include: [
        {
          model: Role,
          attributes: ["level"],
        },
      ],
    });
  }

  public override async findUnsafe(user: UserType): Promise<User | null> {
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

  public override async update(
    password: string,
    user: UserType
  ): Promise<[number]> {
    const { userId } = user;
    return await User.update({ password }, { where: { userId } });
  }

  public override async delete(user: UserType): Promise<number> {
    const { userId } = user;
    return await User.destroy({ where: { userId } });
  }
}

export default UserRepoImpl;
