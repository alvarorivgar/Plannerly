const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup-form.hbs");
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password1, password2,  role } = req.body;

  // All fields are filled
  if (username === "" || email === "" || password1 === "" || password2 === "") {
    res.render("auth/signup-form.hbs", {
      errorMessage: "All fields are required",
    });
    return;
  }

  // Passwords match

  if(password1 !== password2){
    res.render("auth/signup-form.hbs", {
        errorMessage: "Passwords do not match",
      });
  }

  // Password requirements are met
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (passwordRegex.test(password1) === false) {
    res.render("auth/signup-form.hbs", {
      errorMessage:
        "Password must be at least 8 characters long, include upper case letters and a special character",
    });
    return;
  }

  try {
    // Username does not exist in DB
    const foundUsername = await User.findOne({ username: username });
    if (foundUsername !== null) {
      res.render("auth/signup-form.hbs", {
        errorMessage: "Username already exists",
      });
      return;
    }

    // Email does not exist in DB
    const foundEmail = await User.findOne({ email: email });
    if (foundEmail !== null) {
      res.render("auth/signup-form.hbs", {
        errorMessage: "Email already exists",
      });
      return;
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password1, salt);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});

router.get("/login", (req, res, next) => {
    res.render("auth/login-form.hbs")
})

router.post("/login", async (req, res, next) => {
    const {email, password} = req.body;

    //All fields are filled
    if (email === "" || password === "") {
        res.render("auth/login-form.hbs", {
          errorMessage: "All fields are required",
        });
      }
    
    // Validate user
    try {
        const foundUser = await User.findOne({ email: email });
        if (foundUser === null) {
          res.render("auth/login-form.hbs", {
            errorMessage: "User does not exist.",
          });
          return;
        }
        // Verify password
        const isPasswordCorrect = await bcrypt.compare(
          password,
          foundUser.password
        );
        if (isPasswordCorrect === false) {
          res.render("auth/login-form.hbs", {
            errorMessage: "Incorrect password!",
          });
          return;
        }
    
        // Create session
        req.session.activeUser = foundUser;
        req.session.save(() => {
          res.redirect("/profile"); 
        });
      } catch (error) {
        next(error);
      }
})

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
      res.redirect("/")
  })
})

module.exports = router;
