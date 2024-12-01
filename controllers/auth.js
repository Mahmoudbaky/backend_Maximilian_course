import User from "../models/user.js";

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

  User.findById("674ad0bb0b2c3857298ceedb")
    .then((user) => {
      req.session.isLoggedIn = true; // this session will be stored in the server side and the id of the session will be stored in the cookie
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

export const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
