const uuid = require('uuid');
const Task = require('./task.model');
const usersService = require('../users/user.service');
const boardService = require('../boards/board.service');

const users = usersService.getAll();
const boards = boardService.getAllBoards();

const tasks = [
  new Task({
    id: uuid(),
    title: 'Title',
    order: 0,
    description: 'Description',
    userId: users[0].id,
    boardId: boards[0].id,
    columnId: boards[0].columns[0].id
  })
];

const getTasksByBoardId = boardID => {
  return tasks.filter(item => item.boardId === boardID).map(Task.toResponse);
};

const getTaskById = (id, boardID) => {
  return tasks
    .filter(item => item.boardId === boardID)
    .map(Task.toResponse)
    .find(item => item.id === id);
};

const createTask = requestBody => {
  const newTask = new Task({
    id: uuid(),
    title: requestBody.title,
    order: requestBody.order,
    description: requestBody.description,
    userId: requestBody.userId,
    boardId: requestBody.boardId,
    columnId: requestBody.columnId
  });
  tasks.push(newTask);
  return tasks[tasks.length - 1];
};

const updateTask = (taskId, boardId, requestBody) => {
  const index = tasks.indexOf(
    tasks.find(item => item.id === taskId && item.boardId === boardId)
  );
  const updatedTask = new Task({
    id: requestBody.id,
    title: requestBody.title,
    order: requestBody.order,
    description: requestBody.description,
    userId: requestBody.userId,
    boardId: requestBody.boardId,
    columnId: requestBody.columnId
  });

  tasks.splice(index, 1, updatedTask);

  return tasks.map(Task.toResponse).find(item => item.id === requestBody.id);
};

const deleteTask = async (taskId, boardId) => {
  const index = tasks.indexOf(
    tasks.find(item => item.id === taskId && item.boardId === boardId)
  );
  tasks.splice(index, 1);
};

const deleteAllTasksByBoardId = boardId => {
  const tasksList = tasks.filter(item => item.boardId === boardId);
  tasksList.map(item => {
    const index = tasks.indexOf(item);
    tasks.splice(index, 1);
  });
};

const removeAssignment = id => {
  return tasks
    .filter(item => item.userId === id)
    .map(item => (item.userId = null));
};

module.exports = {
  getTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasksByBoardId,
  removeAssignment
};
