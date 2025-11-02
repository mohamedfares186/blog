import User from "../../models/users.model.ts";

interface UserInterface {
  userId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  password?: string;
  roleId?: string;
  dateOfBirth?: Date;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

abstract class UserRepository {
  protected abstract create(user: UserInterface): Promise<User>;
  protected abstract findSafe(user: UserInterface): Promise<User | null>;
  protected abstract findUnsafe(user: UserInterface): Promise<User | null>;
  protected abstract update(
    password: string,
    user: UserInterface
  ): Promise<[number]>;
  protected abstract delete(user: UserInterface): Promise<number>;
}

export default UserRepository;
export type { UserInterface };
