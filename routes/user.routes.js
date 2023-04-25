const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const KEY = process.env.KEY;

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_pass) => {
      if (err) {
        console.log("Error while hashing the password", err);
      } else {
        const user = new UserModel({ name, email, password: secure_pass });
        await user.save();
        res.send("User Registered");
      }
    });
  } catch (error) {
    console.log("Error While registering the user", error);
    res.send("Error while registering user");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              userID: user[0]._id,
            },
            KEY
          );
          res.send({ msg: "login successful", token: token });
        } else {
          res.send("Wrong credentials");
        }
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (error) {
    console.log("Error while loging in", error);
    res.send("Error while loging in");
  }
});

module.exports = {
  userRouter,
};
