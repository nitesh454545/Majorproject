const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const { render } = require("ejs");

// signup
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


// Login Form
router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login   
);


// Logout
router.get("/logout", userController.logout);

module.exports = router;
