// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(401).json({ msg: "User already exists" });
    }
    // bcrypt.hash(password, 10, async (err, hash) => {
    //   if (err) {
    //     return res.status(400).send("something went wrong during hashing");
    //   }
    //   user = new User({
    //     username,
    //     password: hash,
    //   });

    //   await user.save();
    // });
    console.log(password);
    user = new User({
      username,
      password,
    });

    await user.save();
    // console.log(passowrd);
    // const payload = { user: { id: user.id } };

    // jwt.sign(payload, "your_jwt_secret", { expiresIn: 3600 }, (err, token) => {
    //   if (err) throw err;
    //   res.json({ token });
    // });
    res.status(200).send("User Registration Successful");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "User not found !!" });
    }
    // console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const payload = { id: user.id, username: user.username };

    jwt.sign(payload, "your_jwt_secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ msg: "login successful", token: token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server error");
  }
});

module.exports = router;
