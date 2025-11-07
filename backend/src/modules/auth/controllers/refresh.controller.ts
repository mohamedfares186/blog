import type { Response } from "express";
import RefreshService from "../services/refresh.service.ts";
import { logger } from "../../../middleware/logger.ts";
import env from "../../../config/env.ts";
import type { UserRequest } from "../../../types/request.ts";

const { ENV } = env;

class RefreshController {
  constructor(protected session = new RefreshService()) {
    this.session = session;
  }

  refresh = async (req: UserRequest, res: Response): Promise<Response> => {
    try {
      const userId = req?.user?.userId;
      const token = req?.cookies["refresh-token"];

      if (!token || !userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { accessToken, refreshToken } = await this.session.refresh(
        userId,
        token
      );

      if (!accessToken || !refreshToken) {
        return res.status(500).json({
          message: "Failed to generate new tokens",
        });
      }

      res.cookie("access-token", accessToken, {
        httpOnly: true,
        secure: ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });

      res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.status(200).json({
        message: "Tokens refreshed successfully",
      });
    } catch (error) {
      logger.error(`Error refreshing tokens: ${error}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default RefreshController;
