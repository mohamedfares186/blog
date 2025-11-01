import "dotenv/config";
import app from "./app.ts";
import env from "./config/env.ts";
import { dbConnection } from "./config/db.ts";
import { logger } from "./middleware/logger.ts";

const { PORT } = env;

app.listen(PORT, "0.0.0.0", async () => {
  await dbConnection();
  logger.info(`Server is running on port: ${PORT}`);
});
