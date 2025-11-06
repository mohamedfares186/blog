import UserRepoImpl from "../repositories/users.repository.implementation.ts";
import { logger } from "../../../middleware/logger.ts";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import type User from "../../users/models/users.model.ts";
import type { RegisterCredentials } from "../../../types/credentials.ts";

class RegisterService {
  constructor(protected users = new UserRepoImpl()) {
    this.users = users;
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    const { firstName, lastName, email, username, password, dateOfBirth } =
      credentials;
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

      const check = await this.users.findUnsafe(credentials);

      if (check) throw new Error("Invalid Email or Username");

      const passwordHash: string = await bcrypt.hash(password, 12);
      const userId: string = uuidv4();

      const newUser: User = await this.users.create({
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

      return newUser;
    } catch (error) {
      logger.error(`Error User Register: ${error}`);
      throw error;
    }
  }
}

export default RegisterService;
