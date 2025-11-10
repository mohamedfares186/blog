import { logger } from "../../../middleware/logger.ts";
import type { LoginCredentials } from "../../../types/credentials.ts";
import User from "../../users/models/users.model.ts";
import bcrypt from "bcryptjs";

class LoginService {
  async login(credentials: LoginCredentials): Promise<User> {
    const { username, password } = credentials;

    if (!username || !password) throw new Error("All fields are required");

    try {
      const matchUser = await User.findOne({ where: { username } });
      if (!matchUser) throw new Error("Invalid Credentials");

      const passwordCompare = await bcrypt.compare(
        password,
        matchUser.password
      );
      if (!passwordCompare) throw new Error("Invalid Credentials");

      return matchUser;
    } catch (error) {
      logger.error(`Error logging user in: ${error}`);
      throw error;
    }
  }
}

export default LoginService;
