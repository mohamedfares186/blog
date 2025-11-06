import jwt from "jsonwebtoken";
import crypto from "crypto";
import env from "../config/env.ts";
import User from "../modules/users/models/users.model.ts";

const { JWT } = env;

class Tokens {
  static access(user: User): string {
    const { userId, roleId, isVerified } = user;
    return jwt.sign(
      {
        userId,
        roleId,
        isVerified,
      },
      JWT,
      { expiresIn: "1h" }
    );
  }

  static refresh(userId: string): string {
    return jwt.sign({ userId }, JWT, { expiresIn: "7d" });
  }

  static secure(userId: string, secret: string): string {
    const random = crypto.randomBytes(32).toString("hex");
    const timeStamp = Date.now();
    const hmac = crypto
      .createHmac("sha256", secret)
      .update(`${userId}.${random}.${timeStamp}`)
      .digest("hex");

    return `${random}.${userId}.${timeStamp}.${hmac}`;
  }

  static validate(token: string, secret: string, expire: number): boolean {
    const split = token.split(".");

    if (split.length !== 4) return false;

    const [random, userId, timeStamp, hmac] = split;
    const now = Date.now();

    if (Number(now) - Number(timeStamp) > Number(expire)) return false;

    const validHmac = crypto
      .createHmac("sha256", secret)
      .update(`${userId}.${random}.${timeStamp}`)
      .digest("hex");

    if (validHmac !== hmac) return false;

    return true;
  }
}

export default Tokens;
