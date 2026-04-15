const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

// POST signup
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "User registered", user });
};

// POST login
const loginUser = async (req, res) => {
  console.log(req.body, "fasdfklajsdfas");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Email is not registered with us!" });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  const jwtToken = jwt.sign({ id: user._id }, "secret123", { expiresIn: "1d" });
  res.json({
    message: "Login successful!",
    jwtToken,
  });
};

// DELETE user
const deleteUser = async (req, res) => {
  const id = req.params.idf;

  const userExists = await User.findById({ id });

  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.deleteOne();

  res.json({ message: "User deleted successfully" });
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  loginUser,
};
