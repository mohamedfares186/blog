import Tokens from "../../../lib/token.ts";
import env from "../../../config/env.ts";
import { logger } from "../../../middleware/logger.ts";
import RegisterService from "../services/register.service.ts";
import type { Request, Response } from "express";

const { ENV } = env;

class RegisterController {
  constructor(protected registration = new RegisterService()) {
    this.registration = registration;
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName, email, username, password, dateOfBirth } =
      req.body;

    try {
      if (
        !firstName ||
        !lastName ||
        !email ||
        !username ||
        !password ||
        !dateOfBirth
      )
        return res.status(400).json({ message: "All fields are required" });

      const newUser = await this.registration.register({
        firstName,
        lastName,
        email,
        username,
        password,
        dateOfBirth,
      });

      if (!newUser)
        return res
          .status(400)
          .json({ message: "Something went wrong, please try again later!" });

      const accessToken = Tokens.access(newUser);
      const refreshToken = Tokens.refresh(newUser.userId);

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

      return res
        .status(201)
        .json({ message: "Registered successfully, please verify your email" });
    } catch (error) {
      logger.error(`Error User Register: ${error}`);
      if (res.statusCode >= 400 && res.statusCode < 500)
        return res.status(res.statusCode).json({ message: error });
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}

export default RegisterController;
