import { Op } from "sequelize";
import User from "../../users/models/users.model.ts";
import UserRepository from "../../users/repositories/contract/users.repository.ts";
import type { UserType } from "../../../types/user.ts";

class UserRepoImpl extends UserRepository {
  public override async create(user: UserType): Promise<User> {
    const { firstName, lastName, email, username, password, dateOfBirth } =
      user;
    return await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      dateOfBirth,
    });
  }

  public override async findSafe(user: UserType): Promise<User | null> {
    const { email, username } = user;
    return await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });
  }

  public override async findUnsafe(user: UserType): Promise<User | null> {
    const { email, username } = user;
    return await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
      attributes: {
        include: ["password"],
      },
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
