import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/dev.sqlite3",
});

export default sequelize;
