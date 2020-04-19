const Board = require('./board.model');

const getAll = async () => {
  return await Board.find({});
};

const getBoard = async id => {
  return Board.findById(id);
};

const createBoard = async (board = {}) => {
  return Board.create(board);
};

const updateBoard = async (id, board) => {
  return Board.updateOne({ _id: id }, board);
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
