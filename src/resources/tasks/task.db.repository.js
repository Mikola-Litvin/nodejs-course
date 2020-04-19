const Task = require('./task.model');

const getAll = async () => {
  return await Task.find({});
};

const getTasksByBoard = async boardId => {
  return await Task.find({ boardId });
};

const getTask = async id => {
  return Task.findById(id);
};

const createTask = async (task = {}) => {
  return Task.create({ ...task });
};

const updateTask = async (boardId, taskId, task) => {
  return Task.updateOne({ _id: taskId }, task);
};

const deleteTask = async id => {
  return (await Task.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByBoard
};
