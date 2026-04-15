const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
  loginUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Register
router.post("/user/signup", createUser);

// Login
router.post("/user/login", loginUser);

// GET  user by id
router.get("/user/profile/:id", protect, getUserById);
router.get("/users", protect, getUsers);

module.exports = router;
