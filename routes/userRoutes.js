const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
  loginUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Register
router.post("/user/signup", createUser);

// Login
router.post("/user/login", loginUser);

// GET  user by id
router.get("/user/profile/:id", protect, getUserById);
router.get("/users", protect, getUsers);
router.post(
  "/user/upload-profile-pic",
  protect,
  upload.single("profile-image"),
  (req, res) => {
    res.json({
      message: "Image uploaded",
      file: `/uploads/${req.file.filename}`,
    });
  },
);

module.exports = router;
