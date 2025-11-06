interface EnvironmentType {
  ENV: string;
  PORT: number;
  JWT: string;
  SECURE: string;
  DATABASE_URL?: string;
  EMAIL_HOST?: string;
  EMAIL_PORT?: string;
  EMAIL_USER?: string;
  EMAIL_PASS?: string;
}

export type { EnvironmentType };
