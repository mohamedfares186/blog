import type { NextFunction, Response } from "express";
import rateLimit, { type Options } from "express-rate-limit";
import type { UserRequest } from "../config/env.ts";
import { logger } from "./logger.ts";

const rateLimitHandler = (
  req: UserRequest,
  res: Response,
  next: NextFunction,
  options: Options
) => {
  const error = {
    status: "error",
    message: "Too many requests, please try again later",
    retryAfter: Math.round(options.windowMs / 1000),
    limit: options.limit,
    windowMs: options.windowMs,
  };

  logger.warn("Rate limit exceeded:", {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    url: req.originalUrl,
    method: req.method,
    userId: req.user?.userId || "anonymous",
    timestamp: new Date().toISOString(),
  });

  return res.status(429).json(error);
};

const skipRequests = (): boolean => {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  return false;
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  message: "Too many requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  skip: skipRequests,
});

export default limiter;
