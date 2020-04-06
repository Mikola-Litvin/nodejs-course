const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const createUser = requestBody => usersRepo.createUser(requestBody);

const updateUser = (userId, requestBody) =>
  usersRepo.updateUser(userId, requestBody);

const deleteUser = userId => usersRepo.deleteUser(userId);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
