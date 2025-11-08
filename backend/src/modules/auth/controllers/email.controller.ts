import type { Response } from "express";
import type { UserRequest } from "../../../types/request.ts";
import EmailService from "../services/email.service.ts";

class EmailController {
  constructor(protected email = new EmailService()) {
    this.email = email;
  }
  send = async (req: UserRequest, res: Response): Promise<Response> => {
    const userId: string = req.user?.userId;
    const { email } = req.body;
    const sendEmail = await this.email.send(userId, email);
    if (!sendEmail)
      return res
        .status(500)
        .json({ message: "Error sending an email, please try again later" });
    return res
      .status(200)
      .json({ message: "email has been sent to your email" });
  };
  verify = async (req: UserRequest, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const token = req.params?.token;
    if (!userId || !token)
      return res.status(400).json({ message: "Unauthorized" });

    const verifyEmail = await this.email.verify(userId, token);
    if (!verifyEmail)
      return res.status(500).json({ message: "Internal server error" });

    return res
      .status(200)
      .json({ message: "email has been verified successfully" });
  };
}

export default EmailController;
