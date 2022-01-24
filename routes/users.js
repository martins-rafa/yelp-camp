const express = require("express");
const passport = require("passport");

const catchAsync = require("../utils/catchAsync");
const usersControllers = require("../controllers/users");

const router = express.Router();

router
  .route("/register")
  .get(usersControllers.renderRegisterForm)
  .post(catchAsync(usersControllers.register));

router
  .route("/login")
  .get(usersControllers.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    usersControllers.login
  );

router.get("/logout", usersControllers.logout);

module.exports = router;
