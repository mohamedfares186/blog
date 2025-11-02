import type { Request } from "express";

interface UserRequest extends Request {
  user?: {
    userId: string;
    role: string;
    isVerified: boolean;
  };
}

interface environment {
  ENV: string;
  PORT: number;
  JWT: string;
  DATABASE_URL?: string;
  EMAIL_HOST?: string;
  EMAIL_PORT?: string;
  EMAIL_USER?: string;
  EMAIL_PASS?: string;
}

const env: environment = {
  ENV: String(process.env.NODE_ENV) || "development",
  PORT: Number(process.env.PORT) || 5000,
  JWT: String(process.env.JWT_SECRET),
  DATABASE_URL: String(process.env.DATABASE_URL),
  EMAIL_HOST: String(process.env.EMAIL_HOST),
  EMAIL_PORT: String(process.env.EMAIL_PORT),
  EMAIL_USER: String(process.env.EMAIL_USER),
  EMAIL_PASS: String(process.env.EMAIL_PASS),
};

export default env;
export { type UserRequest };
