import { Sequelize } from "sequelize";
import { logger } from "../middleware/logger.ts";
import type { Dialect, Options as SequelizeOptions } from "sequelize";

const PRODUCTION: boolean =
  process.env.NODE_ENV === "production" && !!process.env.DATABASE_URL;

const database: SequelizeOptions = {
  dialect: (PRODUCTION ? "postgres" : "sqlite") as Dialect,
  storage: PRODUCTION ? process.env.DATABASE_URL || "" : "database/dev.sqlite3",
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
