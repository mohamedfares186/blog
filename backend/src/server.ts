import "dotenv/config";
import app from "./app.ts";
import env from "./config/env.ts";
import sequelize from "./config/db.ts";

const { PORT } = env;

try {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  console.log("Database has been connected and synced successfully");
} catch (error) {
  console.log(`Error connecting to the database: ${error}`);
}

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port: ${PORT}`)
);
