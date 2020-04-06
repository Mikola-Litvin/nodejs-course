const uuid = require('uuid');
const User = require('./user.model');

const users = [
  new User({
    id: uuid(),
    name: 'USER',
    login: 'user',
    password: 'P@55w0rd'
  })
];

const getAll = () => {
  return users;
};

const getUserById = id => {
  return users.map(User.toResponse).find(item => item.id === id);
};

const createUser = requestBody => {
  const newId = uuid();
  users.push({
    id: newId,
    name: `${requestBody.name}`,
    login: `${requestBody.login}`,
    password: `${requestBody.password}`
  });
  return users.map(User.toResponse).find(item => item.id === newId);
};

const updateUser = (userId, requestBody) => {
  const index = users.indexOf(users.find(item => item.id === userId));
  const updatedUser = {
    id: userId,
    name: `${requestBody.name}`,
    login: `${requestBody.login}`,
    password: `${requestBody.password}`
  };

  users.splice(index, 1, updatedUser);

  return users.map(User.toResponse).find(item => item.id === userId);
};

const deleteUser = userId => {
  const index = users.indexOf(users.find(item => item.id === userId));
  users.splice(index, 1);
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
