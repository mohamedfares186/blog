import jwt from "jsonwebtoken";
import env from "../config/env.ts";
import crypto from "crypto";

const { JWT } = env;

interface User {
  userId: string;
  role?: string;
  permissions?: string;
  isVerified?: boolean;
}

class Tokens {
  static access(user: User): string {
    const { userId, role, isVerified } = user;
    return jwt.sign(
      {
        userId,
        role,
        isVerified,
      },
      JWT,
      { expiresIn: "1h" }
    );
  }

  static refresh(user: User): string {
    const { userId } = user;
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
