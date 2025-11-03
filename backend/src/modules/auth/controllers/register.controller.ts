import { logger } from "../../../middleware/logger.ts";
import RegisterService from "../services/register.service.ts";
import type { Request, Response } from "express";

class RegisterController {
  constructor(protected registration = new RegisterService()) {
    this.registration = registration;
  }

  async register(req: Request, res: Response): Promise<Response> {
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

      return res
        .status(201)
        .json({ message: "Registered successfully, please verify your email" });
    } catch (error) {
      logger.error(`Error User Register: ${error}`);
      if (error === "Invalid Email or Username")
        return res.status(400).json({ message: error });
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default RegisterController;
