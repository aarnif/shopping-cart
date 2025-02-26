import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default { sequelize, connectToDatabase };
