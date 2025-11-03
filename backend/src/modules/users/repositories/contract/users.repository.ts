import User from "../../models/users.model.ts";
import type { UserType } from "../../../../types/user.ts";

abstract class UserRepository {
  protected abstract create(user: UserType): Promise<User>;
  protected abstract findSafe(user: UserType): Promise<User | null>;
  protected abstract findUnsafe(user: UserType): Promise<User | null>;
  protected abstract update(
    password: string,
    user: UserType
  ): Promise<[number]>;
  protected abstract delete(user: UserType): Promise<number>;
}

export default UserRepository;
