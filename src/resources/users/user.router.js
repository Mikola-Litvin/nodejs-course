const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.param('id', async (req, res, next, id) => {
  const user = await usersService.getUserById(id);
  res.user = user;
  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const newUser = await usersService.createUser(req.body);
    res.json(newUser);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    if (res.user) {
      res.json(res.user);
    } else {
      res.status(404).send();
    }
  })
  .put(async (req, res) => {
    const updateUser = await usersService.updateUser(res.user.id, req.body);
    if (updateUser) {
      res.json(updateUser);
    } else {
      res.status(400).send();
    }
  })
  .delete(
    async (req, res, next) => {
      await tasksService.removeAssignment(res.user.id);
      next();
    },
    async (req, res) => {
      await usersService.deleteUser(res.user.id);
      res.sendStatus(200);
    }
  );

module.exports = router;
