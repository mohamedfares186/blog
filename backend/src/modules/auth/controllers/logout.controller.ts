import type { Request, Response } from "express";
import { logger } from "../../../middleware/logger.ts";
import LogoutService from "../services/logout.service.tsrefresh.service.ts";

class LogoutController {
  constructor(protected session = new LogoutService()) {
    this.session = session;
  }

  logout = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = req.cookies["refresh-token"];
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const revokeSession = await this.session.logout(token);
      if (!revokeSession)
        return res.status(400).json({ message: "Bad Request" });

      res.clearCookie("refresh-token");
      res.clearCookie("access-token");

      return res.status(204).json({ message: "Logged out seccessfully" });
    } catch (error) {
      logger.error(`Error logging user out: ${error}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default LogoutController;
