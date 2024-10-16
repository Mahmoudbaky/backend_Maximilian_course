// imports
import * as fs from "node:fs";
import express from "express";
import bodyParser from "body-parser";
import path from "node:path";
import { router as adminRoutes } from "./routes/admin.js";
import { router as shopRoutes } from "./routes/shop.js";
import { fileURLToPath } from "node:url";
import { getErrorPage } from "./controllers/error.js";
import sequelize from "./util/database.js";
import { Product } from "./models/product.js";
import { User } from "./models/user.js";
import { name } from "ejs";

// constants
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory the file is in

// middleware
app.set("view engine", "ejs"); // this will set the view engine to pug
app.set("views", "views"); // this will set the views directory to views  (this is the default btw , so you don't have to do this)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // this will make the public folder accessible to the browser

app.use("/admin", adminRoutes); // this will automatically add /admin to the routes in adminRoutes
app.use(shopRoutes);

app.use(getErrorPage);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Mahmoud", email: "Ma7mouudbaky@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
