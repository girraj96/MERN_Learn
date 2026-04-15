require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

connectDB();
app.use(express.json());
app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("Server started");
});
