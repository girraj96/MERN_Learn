const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
  loginUser,
  uploadProfileImage,
  deleteUser,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadCloud");

// Register
router.post("/user/signup", createUser);

// Login
router.post("/user/login", loginUser);

// GET  user by id
router.get("/user/profile", protect, getUserById);
router.get("/users", protect, getUsers);
router.post(
  "/user/upload",
  protect,
  upload.single("image"),
  uploadProfileImage,
);

router.delete("/user/delete/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
