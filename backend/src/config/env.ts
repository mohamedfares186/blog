interface environment {
  ENV: string;
  PORT: number;
}

const env: environment = {
  ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,
};

export default env;
