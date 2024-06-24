const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("./config/db");
const route = require("./routes/user.routes");
const breweryRoutes = require("./routes/brewery");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", route);
app.use("/api/breweries", breweryRoutes);
dotenv.config();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Health check");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Connected to Server at Port ${PORT} and connected to DB`);
  } catch (error) {
    console.log("Something went wrong");
  }
});
