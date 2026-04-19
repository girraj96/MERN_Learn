const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/userService");

// POST signup
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body || {};

  if (!name || !email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({ message: "User registered!", user });
});

// POST login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Email is not registered with us!");
    error.statusCode = 400;
    throw error;
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    const error = new Error("Password is incorrect");
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.json({
    message: "Login successful!",
    token,
  });
});

const getUserById = async (req, res) => {
  const user = await userService.getUserProfile(req.user.id);
  res.json(user);
};

const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const search = req.query.search || "";
  const sort = req.query.sort || "-createdAt";

  const query = {
    name: { $regex: search, $options: "i" },
  };
  console.log(sort, "<====sort");

  const users = await User.find(query).sort(sort).skip(skip).limit(limit);

  const total = await User.countDocuments(query);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    users,
  });
});

const uploadProfileImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // 👇 THIS IS WHAT YOU ASKED
  user.profileImage = req.file.path;

  await user.save();

  res.json({
    message: "Profile image updated",
    profileImage: user.profileImage,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userService.deleteUser(id);
  res.json({ message: "User deleted", user });
});

module.exports = {
  createUser,
  loginUser,
  getUserById,
  getUsers,
  uploadProfileImage,
  deleteUser,
};
