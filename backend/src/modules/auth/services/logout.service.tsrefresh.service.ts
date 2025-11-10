import { logger } from "../../../middleware/logger.ts";
import Session from "../../users/models/sessions.model.ts";

class LogoutService {
  async logout(token: string): Promise<boolean> {
    try {
      const updateSession = await Session.update(
        { isRevoked: true },
        { where: { token } }
      );
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
