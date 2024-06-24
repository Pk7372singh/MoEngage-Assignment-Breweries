// app.js
// const authRoutes = require("../routes/user.routes");

// app.use("/api/auth", authRoutes);
// middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //   console.log(token);
  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.username = decoded.username;
    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = auth;
