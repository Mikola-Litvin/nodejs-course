const Board = require('./board.model');

const boards = [new Board()];
// for (let i = 0; i < 3; i += 1) {
//   const newId = uuid();
//   users.push({
//     id: newId,
//     name: 'USER',
//     login: 'user',
//     password: 'P@55w0rd'
//   });
// }

const getAllBoards = () => {
  return boards;
};

const getBoardById = id => {
  return boards.find(item => item.id === id);
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

module.exports = { getAllBoards, getBoardById };
