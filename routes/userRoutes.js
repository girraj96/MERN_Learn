const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  loginUser,
} = require("../controllers/userController");

// GET all users
router.get("/users", getUsers);

// GET user by ID
router.get("/users/:id", getUserById);

// POST user
router.post("/user/signup", createUser);

// POST user
router.post("/user/login", loginUser);

// DELETE user
router.delete("/users/:id", deleteUser);

module.exports = router;
