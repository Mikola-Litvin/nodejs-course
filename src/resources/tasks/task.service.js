const tasksRepo = require('./task.memory.repository');

const getTasksByBoardId = boardID => tasksRepo.getTasksByBoardId(boardID);

const getTaskById = (id, boardID) => tasksRepo.getTaskById(id, boardID);

const createTask = requestBody => tasksRepo.createTask(requestBody);

const updateTask = (taskId, boardId, requestBody) =>
  tasksRepo.updateTask(taskId, boardId, requestBody);

const deleteTask = (taskId, boardId) => tasksRepo.deleteTask(taskId, boardId);

const deleteAllTasksByBoardId = boardId =>
  tasksRepo.deleteAllTasksByBoardId(boardId);

const removeAssignment = id => tasksRepo.removeAssignment(id);

module.exports = {
  getTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasksByBoardId,
  removeAssignment
};
