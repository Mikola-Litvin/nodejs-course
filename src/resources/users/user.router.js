const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.param('id', async (req, res, next, id) => {
  const user = await usersService.getUserById(id);
  res.user = user;
  next();
});

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const newUser = await usersService.createUser(req.body);
  res.json(newUser);
});

router.route('/:id').get(async (req, res) => {
  res.json(res.user);
});

router.route('/:id').put(async (req, res) => {
  const updateUser = await usersService.updateUser(res.user.id, req.body);
  res.json(updateUser);
});

// router.route('/:id').delete(async (req, res) => {
//   await usersService.deleteUser(res.user.id);
//   res.status(200);
// });

module.exports = router;
