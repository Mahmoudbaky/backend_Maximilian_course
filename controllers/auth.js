import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postLogin = (req, res, next) => {
  // req.isLoggedIn = true; // this info is gone after the response , so we need to store this data in the clinte to use it
  // res.setHeader("Set-Cookie", "loggedIn = true ");

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.redirect("/login");
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          // we made a return to not execute the res.redirect("/login") after the save
          console.log(err);
          res.redirect("/");
        });
      }
      res.redirect("/login");
    });
  });
};

export const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

export const postLogout = (req, res, next) => {
  // session.destroy() will delete the session from the database
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

export const postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12) // 12 is the number of rounds to hash the password
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};
