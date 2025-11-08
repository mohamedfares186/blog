import UserRepoImpl from "../repositories/users.repository.implementation.ts";
import { logger } from "../../../middleware/logger.ts";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import type User from "../../users/models/users.model.ts";
import type { RegisterCredentials } from "../../../types/credentials.ts";
import Tokens from "../../../lib/token.ts";
import sendEmail from "../../../lib/email.ts";
import env from "../../../config/env.ts";

const { SECURE } = env;

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

      const token = Tokens.secure(newUser.userId as string, SECURE as string);

      const link = `http://localhost:5000/api/auth/email/${token}`;

      await sendEmail(
        newUser.email,
        "Verify your Email",
        `Click this link to verify your email: ${link}`
      );

      return newUser;
    } catch (error) {
      logger.error(`Error User Register: ${error}`);
      throw error;
    }
  }
}

export default RegisterService;
