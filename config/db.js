const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mernUser:mern123@mern-learn-cluster.wappsqa.mongodb.net/?appName=mern-learn-cluster",
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
