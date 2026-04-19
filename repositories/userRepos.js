const User = require("../models/User");

const getUserById = (id) => User.findById(id);
const deleteUserById = (id) => User.findByIdAndDelete(id);

module.exports = {
  getUserById,
  deleteUserById,
};
