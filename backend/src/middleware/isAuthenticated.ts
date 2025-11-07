import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "../config/env.ts";
import { logger } from "./logger.ts";
import type { UserRequest } from "../types/request.ts";
import type { Response, NextFunction } from "express";

const { JWT } = env;

const extractTokenFromRequest = (req: UserRequest): string | null => {
  const authHeader = req.headers && req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length);
  }
  if (req.cookies && req.cookies["access-token"]) {
    return req.cookies["access-token"];
  }
  return null;
};

const authenticate = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = extractTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, JWT);
      req.user = decoded as JwtPayload;
      return next();
    } catch (jwtError) {
      logger.warn(`JWT Verification Failed: ${jwtError}`);
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    logger.error(`Authentication Error: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authenticate;
