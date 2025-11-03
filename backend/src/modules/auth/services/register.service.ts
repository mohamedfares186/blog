import UserRepoImpl from "../repositories/users.repository.implementation.ts";
import type { UserType } from "../../../types/user.ts";
import { logger } from "../../../middleware/logger.ts";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

class RegisterService {
  constructor(protected users = new UserRepoImpl()) {
    this.users = users;
  }

  async register(user: UserType): Promise<boolean> {
    const { firstName, lastName, email, username, password, dateOfBirth } =
      user;

    try {
      if (
        !firstName ||
        !lastName ||
        !email ||
        !username ||
        !password ||
        !dateOfBirth
      )
        throw new Error("All fields are required");

      const check = await this.users.findSafe(user);

      if (check) throw new Error("Invalid Email or Username");

      const passwordHash: string = await bcrypt.hash(password, 12);
      const userId = uuidv4();

      const newUser = await this.users.create({
        userId,
        firstName,
        lastName,
        email,
        username,
        password: passwordHash,
        dateOfBirth,
      });

      if (!newUser)
        throw new Error("Something went wrong, please try again later!");

      return true;
    } catch (error) {
      logger.error(`Error User Register: ${error}`);
      throw error;
    }
  }
}

export default RegisterService;
