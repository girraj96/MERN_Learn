const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  loginUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Register
router.post("/user/signup", createUser);

// Login
router.post("/user/login", loginUser);

// GET all users
router.get("/user/profile/:id", protect, getUserById);

module.exports = router;
