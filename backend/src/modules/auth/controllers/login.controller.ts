import type { Request, Response } from "express";
import LoginService from "../services/login.service.ts";
import Tokens from "../../../lib/token.ts";
import env from "../../../config/env.ts";
import { logger } from "../../../middleware/logger.ts";

const { ENV } = env;

class LoginController {
  constructor(protected user = new LoginService()) {
    this.user = user;
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const login = await this.user.login({
        username,
        password,
      });
      if (!login)
        return res.status(400).json({ message: "Invalid Credentials" });

      const accessToken = Tokens.access(login);
      const refreshToken = Tokens.refresh(login.userId);

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

      return res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      logger.error(`Error logging user in: ${error}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default LoginController;
