const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
  loginUser,
  uploadProfileImage,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadCloud");

// Register
router.post("/user/signup", createUser);

// Login
router.post("/user/login", loginUser);

// GET  user by id
router.get("/user/profile/:id", protect, getUserById);
router.get("/users", protect, getUsers);
router.post(
  "/user/upload",
  protect,
  upload.single("image"),
  uploadProfileImage,
);

module.exports = router;
