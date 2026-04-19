const { getUserById, deleteUserById } = require("../repositories/userRepos");

const getUserProfile = async (id) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const deleteUser = async (id) => {
  const user = await deleteUserById(id);
  if (!user) throw new Error("User not found");
  return user;
};

module.exports = {
  getUserProfile,
  deleteUser,
};
