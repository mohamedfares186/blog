import type { EnvironmentType } from "../types/environment.ts";

const env: EnvironmentType = {
  ENV: (process.env.NODE_ENV as string) || "development",
  PORT: (process.env.PORT as unknown as number) || 5000,
  JWT: process.env.JWT_SECRET as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  EMAIL_HOST: process.env.EMAIL_HOST as string,
  EMAIL_PORT: process.env.EMAIL_PORT as string,
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASS: process.env.EMAIL_PASS as string,
};

export default env;
