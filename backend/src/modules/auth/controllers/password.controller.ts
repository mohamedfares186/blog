import type { Request, Response } from "express";
import PasswordService from "../services/password.service.ts";
import { logger } from "../../../middleware/logger.ts";
import Tokens from "../../../lib/token.ts";
import env from "../../../config/env.ts";

const { SECURE } = env;

class PasswordController {
  constructor(protected password = new PasswordService()) {
    this.password = password;
  }
  forget = async (req: Request, res: Response) => {
    const email = req.body?.email;
    if (!email)
      return res.status(400).json({ message: "Email field is required" });

    const forget = await this.password.forget(email);
    if (!forget)
      return res.status(500).json({ message: "Something went wrong" });
    logger.error(`Error sending forget password email: ${forget}`);

    return res
      .status(200)
      .json({ message: "Reset email has been sent successfully" });
  };

  reset = async (req: Request, res: Response) => {
    const token = req.params?.token;
    const password = req.body?.password;
    const repeatPassword = req.body?.repeatPassword;
    if (!password || !repeatPassword)
      res.status(400).json({ message: "All field are required" });
    if (password !== repeatPassword)
      return res.status(400).json({ message: "Passwords don't match" });
    if (!token) return res.status(400).json({ message: "Token is required" });

    const validateToken = Tokens.validate(token, SECURE, 3600000);
    if (!validateToken)
      return res.status(400).json({ message: "Invalid or expired token" });

    const resetPassword = await this.password.reset(
      password,
      validateToken as string
    );
    if (!resetPassword)
      return res.status(500).json({ message: "Internal server error" });

    return res
      .status(201)
      .json({ message: "password has been updated successfully" });
  };
}

export default PasswordController;
