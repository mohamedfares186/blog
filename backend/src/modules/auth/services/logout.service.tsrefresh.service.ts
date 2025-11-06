import { logger } from "../../../middleware/logger.ts";
import SessionRepoImpl from "../repositories/sessions.repository.implementation.ts";

class LogoutService {
  constructor(protected session = new SessionRepoImpl()) {
    this.session = session;
  }

  async logout(token: string): Promise<boolean> {
    try {
      const updateSession = await this.session.update(token);
      if (!updateSession)
        throw new Error("Can't Revoke token, please try again later");

      return true;
    } catch (error) {
      logger.error(`Error logging user out: ${error}`);
      throw error;
    }
  }
}

export default LogoutService;
