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

// const createUser = async requestBody => {
//   const newId = uuid();
//   users.push({
//     id: newId,
//     name: `${requestBody.name}`,
//     login: `${requestBody.login}`,
//     password: `${requestBody.password}`
//   });
//   return users.map(User.toResponse).find(item => item.id === newId);
// };

// const updateUser = async (userId, requestBody) => {
//   const index = users.indexOf(users.find(item => item.id === userId));
//   const updatedUser = {
//     id: userId,
//     name: `${requestBody.name}`,
//     login: `${requestBody.login}`,
//     password: `${requestBody.password}`
//   };

//   users.splice(index, 1, updatedUser);

//   return users.map(User.toResponse).find(item => item.id === userId);
// };

// const deleteUser = async userId => {
//   const index = users.indexOf(users.find(item => item.id === userId));
//   users.splice(index, 1);
// };

module.exports = { getTasksByBoardId, getTaskById };
