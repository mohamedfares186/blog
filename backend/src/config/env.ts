import type { Request } from "express";

interface UserRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

interface environment {
  ENV: string;
  PORT: number;
}

const env: environment = {
  ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,
};

export default env;
export { type UserRequest };
