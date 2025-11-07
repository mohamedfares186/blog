import SessionRepoImpl from "../repositories/sessions.repository.implementation.ts";
import { logger } from "../../../middleware/logger.ts";
import Tokens from "../../../lib/token.ts";
import type User from "../../users/models/users.model.ts";

class RefreshService {
  constructor(protected session = new SessionRepoImpl()) {
    this.session = session;
  }

  async refresh(
    userId: string,
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const revokeToken = await this.session.update(token);
      if (!revokeToken) throw new Error("Can't revoke token");

      const accessToken = Tokens.access({ userId } as User);
      const refreshToken = Tokens.refresh(userId);

      const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const createToken = await this.session.create(
        userId,
        refreshToken,
        expiryDate
      );
      if (!createToken) throw new Error("Can't create token");

      return { accessToken, refreshToken };
    } catch (error) {
      logger.error(`Error refreshing token service: ${error}`);
      throw error;
    }
  }
}

export default RefreshService;
