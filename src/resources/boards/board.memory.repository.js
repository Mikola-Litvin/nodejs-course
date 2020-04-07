const uuid = require('uuid');
const Board = require('./board.model');
const Column = require('../columns/column.model');

const boards = [new Board()];

const getAllBoards = () => {
  return boards;
};

const getBoardById = id => {
  return boards.find(item => item.id === id);
};

const createBoard = requestBody => {
  const listColumns = requestBody.columns.map(
    item =>
      new Column({
        id: uuid(),
        title: item.title,
        order: item.order
      })
  );
  boards.push(
    new Board({
      id: uuid(),
      title: requestBody.title,
      columns: listColumns
    })
  );
  return boards[boards.length - 1];
};

const updateBoard = (boardid, requestBody) => {
  const listColumns = requestBody.columns.map(
    item =>
      new Column({
        id: item.id,
        title: item.title,
        order: item.order
      })
  );
  const index = boards.indexOf(boards.find(item => item.id === boardid));
  const updatedBoard = new Board({
    id: requestBody.id,
    title: requestBody.title,
    columns: listColumns
  });

  boards.splice(index, 1, updatedBoard);

  return boards.find(item => item.id === requestBody.id);
};

const deleteBoard = boardId => {
  const index = boards.indexOf(boards.find(item => item.id === boardId));
  boards.splice(index, 1);
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
