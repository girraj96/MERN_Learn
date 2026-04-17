require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");

connectDB();
app.use(express.json());
app.use("/", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started");
});
