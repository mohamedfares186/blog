import sendEmail from "../../../lib/email.ts";
import Tokens from "../../../lib/token.ts";
import env from "../../../config/env.ts";
import bcrypt from "bcryptjs";
import User from "../../users/models/users.model.ts";

const { SECURE } = env;

class PasswordService {
  async forget(email: string) {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) throw new Error("Invalid Credentials");

    const token = Tokens.secure(user.userId as string, SECURE as string);

    const link = `http://localhost:5000/api/auth/password/reset/${token}`;

    return await sendEmail(
      user.email,
      "Reset your Password",
      `Click this link to reset your password: ${link}`
    );
  }

  async reset(password: string, userId: string): Promise<boolean> {
    if (password.length < 8)
      throw new Error("Password can't be less than 8 characters");

    const passwordHash = await bcrypt.hash(password, 12);

    const updatePassword = await User.update(
      { passwordHash },
      { where: { userId } }
    );
    if (!updatePassword)
      throw new Error("Error updating password, please try again later");

    return true;
  }
}

export default PasswordService;
