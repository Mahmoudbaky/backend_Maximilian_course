import { Sequelize } from "sequelize";
import sequelize from "../util/database.js";

export const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
