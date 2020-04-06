const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('../tasks/task.service');

router.param('boardid', async (req, res, next, boardid) => {
  // const task = await tasksService.getTaskById(id);
  res.boardid = boardid;
  next();
});

router.param('taskid', async (req, res, next, taskid) => {
  // const task = await tasksService.getTaskById(id);
  res.taskid = taskid;
  next();
});

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAllBoards();
  res.json(boards);
});

router.route('/:boardid').get(async (req, res) => {
  const board = await boardService.getBoardById(res.boardid);
  res.json(board);
});

router.route('/:boardid/tasks').get(async (req, res) => {
  const tasks = await taskService.getTasksByBoardId(res.boardid);
  res.json(tasks);
});

router.route('/:boardid/tasks/:taskid').get(async (req, res) => {
  const task = await taskService.getTaskById(res.taskid, res.boardid);
  res.json(task);
});

// router.route('/').post(async (req, res) => {
//   const newUser = await usersService.createUser(req.body);
//   res.json(newUser);
// });

// router.route('/:id').get(async (req, res) => {
//   res.json(res.user);
// });

// router.route('/:id').put(async (req, res) => {
//   const updateUser = await usersService.updateUser(res.user.id, req.body);
//   res.json(updateUser);
// });

// router.route('/:id').delete(async (req, res) => {
//   await usersService.deleteUser(res.user.id);
//   res.status(200);
// });

module.exports = router;
