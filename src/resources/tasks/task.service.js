const tasksRepo = require('./task.memory.repository');

const getTasksByBoardId = boardID => tasksRepo.getTasksByBoardId(boardID);

const getTaskById = (id, boardID) => tasksRepo.getTaskById(id, boardID);

// const createUser = requestBody => usersRepo.createUser(requestBody);

// const updateUser = (userId, requestBody) =>
//   usersRepo.updateUser(userId, requestBody);

// const deleteUser = userId => usersRepo.deleteUser(userId);

module.exports = { getTasksByBoardId, getTaskById };
