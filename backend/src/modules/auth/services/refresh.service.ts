import { logger } from "../../../middleware/logger.ts";
import Tokens from "../../../lib/token.ts";
import type User from "../../users/models/users.model.ts";
import Session from "../../users/models/sessions.model.ts";
import { v4 as uuidv4 } from "uuid";

class RefreshService {
  async refresh(
    userId: string,
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const revokeToken = await Session.update(
        { token },
        { where: { userId } }
      );
      if (!revokeToken) throw new Error("Can't revoke token");

      const accessToken = Tokens.access({ userId } as User);
      const refreshToken = Tokens.refresh(userId);

      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const sessionId = uuidv4();
      const createToken = await Session.create({
        sessionId,
        userId,
        refreshToken,
        expiresAt,
        isRevoked: false,
      });
      if (!createToken) throw new Error("Can't create token");

      return { accessToken, refreshToken };
    } catch (error) {
      logger.error(`Error refreshing token service: ${error}`);
      throw error;
    }
  }
}

export default RefreshService;
