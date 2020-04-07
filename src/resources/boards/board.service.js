const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();

const getBoardById = id => boardsRepo.getBoardById(id);

const createBoard = requestBody => boardsRepo.createBoard(requestBody);

const updateBoard = (boardid, requestBody) =>
  boardsRepo.updateBoard(boardid, requestBody);

const deleteBoard = boardId => boardsRepo.deleteBoard(boardId);

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
