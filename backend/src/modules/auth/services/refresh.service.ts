import SessionRepoImpl from "../repositories/sessions.repository.implementation.ts";
import { logger } from "../../../middleware/logger.ts";
import Tokens from "../../../lib/token.ts";

class RefreshService {
  constructor(protected session = new SessionRepoImpl()) {
    this.session = session;
  }

  async refresh(userId: string, token: string): Promise<string> {
    try {
      const revokeToken = await this.session.update(token);
      if (!revokeToken) throw new Error("Can't revoke token");

      const date = new Date(1000 * 60 * 60 * 24 * 7);

      const generateToken = Tokens.refresh(userId);

      const createToken = await this.session.create(
        userId,
        generateToken,
        date
      );
      if (!createToken) throw new Error("Can't create token");

      return generateToken;
    } catch (error) {
      logger.error(`Error refreshing token: ${error}`);
      throw error;
    }
  }
}

export default RefreshService;
