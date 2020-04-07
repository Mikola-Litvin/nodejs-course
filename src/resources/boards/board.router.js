const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('../tasks/task.service');

router.param('boardid', async (req, res, next, boardid) => {
  res.boardid = boardid;
  next();
});

router.param('taskid', async (req, res, next, taskid) => {
  res.taskid = taskid;
  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAllBoards();
    res.json(boards);
  })
  .post(async (req, res) => {
    const newBoard = await boardService.createBoard(req.body);
    res.json(newBoard);
  });

router
  .route('/:boardid')
  .get(async (req, res) => {
    const board = await boardService.getBoardById(res.boardid);
    res.json(board);
  })
  .put(async (req, res) => {
    const updateBoard = await boardService.updateBoard(res.boardid, req.body);
    res.json(updateBoard);
  })
  .delete(
    async (req, res, next) => {
      await taskService.deleteAllTasksByBoardId(res.boardid);
      next();
    },
    async (req, res) => {
      await boardService.deleteBoard(res.boardid);
      res.sendStatus(200);
    }
  );

router
  .route('/:boardid/tasks')
  .get(async (req, res) => {
    const tasks = await taskService.getTasksByBoardId(res.boardid);
    res.json(tasks);
  })
  .post(async (req, res) => {
    const newTask = await taskService.createTask(req.body);
    res.json(newTask);
  });

router
  .route('/:boardid/tasks/:taskid')
  .get(async (req, res) => {
    const task = await taskService.getTaskById(res.taskid, res.boardid);
    res.json(task);
  })
  .put(async (req, res) => {
    const updateTask = await taskService.updateTask(
      res.taskid,
      res.boardid,
      req.body
    );
    res.json(updateTask);
  })
  .delete(async (req, res) => {
    await taskService.deleteTask(res.taskid, res.boardid);
    res.sendStatus(200);
  });

module.exports = router;
