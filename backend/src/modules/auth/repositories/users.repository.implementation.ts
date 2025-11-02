import { Op } from "sequelize";
import User from "../../users/models/users.model.ts";
import UserRepository, {
  type UserInterface,
} from "../../users/repositories/contract/users.repository.ts";

class UserRepoImpl extends UserRepository {
  protected override async create(user: UserInterface): Promise<User> {
    return await User.create({ user });
  }

  protected override async findSafe(user: UserInterface): Promise<User | null> {
    const { email, username } = user;
    return await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });
  }

  protected override async findUnsafe(
    user: UserInterface
  ): Promise<User | null> {
    const { email, username } = user;
    return await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
      attributes: {
        include: ["password"],
      },
    });
  }

  protected override async update(
    password: string,
    user: UserInterface
  ): Promise<[number]> {
    const { userId } = user;
    return await User.update({ password }, { where: { userId } });
  }

  protected override async delete(user: UserInterface): Promise<number> {
    const { userId } = user;
    return await User.destroy({ where: { userId } });
  }
}

export default UserRepoImpl;
