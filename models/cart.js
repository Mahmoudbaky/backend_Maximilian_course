import { Sequelize } from "sequelize";
import sequelize from "../util/database.js";

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default Cart;
