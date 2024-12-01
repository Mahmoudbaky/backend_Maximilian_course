/* Imports */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { router as adminRoutes } from "./routes/admin.js";
import { router as shopRoutes } from "./routes/shop.js";
import { router as authRoutes } from "./routes/auth.js";
import * as errorController from "./controllers/error.js";
import User from "./models/user.js";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";

/* Constants */
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory the file is in
const app = express();
const monogUri =
  "mongodb+srv://ma7mouudbaky:hoda12345@nodejs.srb9q.mongodb.net/shop?retryWrites=true&w=majority&appName=NodeJS";
const port = 3000;
const MongoDBSession = ConnectMongoDBSession(session);

const store = new MongoDBSession({
  uri: monogUri,
  collection: "sessions",
});

/* MiddleWares */
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(monogUri)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "mahmoud",
          email: "ma7mouudbaky@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(port);
    console.log(`http://localhost:${port}`);
  })
  .catch((err) => {
    console.log(err);
  });
