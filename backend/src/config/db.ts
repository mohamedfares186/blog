import { Sequelize } from "sequelize";
import { logger } from "../middleware/logger.ts";
import type { Dialect, Options as SequelizeOptions } from "sequelize";
import env from "./env.ts";

const { ENV, DATABASE_URL } = env;

const PRODUCTION: boolean = ENV === "production" && !!DATABASE_URL;

const database: SequelizeOptions = {
  dialect: (PRODUCTION ? "postgres" : "sqlite") as Dialect,
  storage: PRODUCTION ? (DATABASE_URL as string) : "database/dev.sqlite3",
};

const sequelize = new Sequelize(database);

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    logger.info("Database has been connected and synced successfully");
  } catch (error) {
    logger.error(`Error connecting to the database: ${error}`);
  }
};

export default sequelize;
export { dbConnection };
