import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node", "root", "hoda@12345", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
