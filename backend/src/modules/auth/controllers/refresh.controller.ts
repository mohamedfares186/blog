import type { Response } from "express";
import RefreshService from "../services/refresh.service.ts";
import { logger } from "../../../middleware/logger.ts";
import env from "../../../config/env.ts";
import type { UserRequest } from "../../../types/request.ts";

const { JWT, ENV } = env;

class RefreshController {
  constructor(protected session = new RefreshService()) {
    this.session = session;
  }

  async refresh(req: UserRequest, res: Response): Promise<Response> {
    try {
      const token = req.cookies["refresh-token"];
      const userId = req.user.userId;
      if (!token || !userId)
        return res.status(401).json({ message: "Unauthorized" });

      const refreshToken = await this.session.refresh(userId, token);
      if (!refreshToken)
        return res
          .status(500)
          .json({ message: "something went wrong please try again later" });

      return res.cookie(refreshToken, JWT, {
        httpOnly: true,
        secure: ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    } catch (error) {
      logger.error(`Error refreshing token: ${error}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default RefreshController;
