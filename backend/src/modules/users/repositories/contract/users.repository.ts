import type { RegisterCredentials } from "../../../../types/credentials.ts";
import User from "../../models/users.model.ts";

abstract class UserRepository {
  protected abstract create(user: RegisterCredentials): Promise<User>;
  protected abstract findUnsafe(
    user: RegisterCredentials
  ): Promise<User | null>;
  protected abstract findSafe(userId: string): Promise<User | null>;

  protected abstract findByUsername(username: string): Promise<User | null>;
  protected abstract findByEmail(email: string): Promise<User | null>;

  protected abstract update(
    password: string,
    userId: string
  ): Promise<[number]>;
}

export default UserRepository;
