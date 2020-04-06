const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();

const getBoardById = id => boardsRepo.getBoardById(id);

// const createUser = requestBody => usersRepo.createUser(requestBody);

// const updateUser = (userId, requestBody) =>
//   usersRepo.updateUser(userId, requestBody);

// const deleteUser = userId => usersRepo.deleteUser(userId);

module.exports = { getAllBoards, getBoardById };
