import type { NextFunction } from "express";
import { createLogger, format, transports } from "winston";
import type { UserRequest, UserResponse } from "../types/request.ts";

const { combine, timestamp, json, colorize, printf } = format;

const jsonFormat = combine(timestamp(), json());

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp(),
    printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      level: "debug",
      format: combine(
        colorize(),
        timestamp(),
        printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
    new transports.File({
      filename: "logs/info.log",
      level: "info",
      maxsize: 5242880,
      maxFiles: 5,
      format: jsonFormat,
    }),
    new transports.File({
      filename: "logs/warn.log",
      level: "warn",
      maxsize: 5242880,
      maxFiles: 5,
      format: jsonFormat,
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880,
      maxFiles: 5,
      format: jsonFormat,
    }),
  ],
});

const requestLogger = (
  req: UserRequest,
  res: UserResponse,
  next: NextFunction
) => {
  const { method, url, hostname } = req;
  const userId: string = req.user?.userId || "Anonymous";
  const role: string = req.user?.role || "Guest";
  const start = Date.now();

  logger.info(`${method} Request to ${hostname}${url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode: number = res.statusCode;

    const response = `
      Status Code: ${statusCode} - ${res.statusMessage}
      User: ${userId}
      Role: ${role}
      Duration: ${duration}ms
    `;

    if (statusCode >= 500) {
      logger.error(`Server Error: ${response}`);
    } else if (statusCode >= 400) {
      if (statusCode === 401 || statusCode === 403) {
        logger.warn(`[SECURITY] Unauthorized/Forbidden Access: ${response}`);
      } else {
        logger.warn(`Client Error: ${response}`);
      }
    } else {
      logger.info(`Response Information: ${response}`);
    }
  });
  return next();
};

export default requestLogger;
export { logger };
