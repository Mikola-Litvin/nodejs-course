const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const token = await loginService.loginUser(login, password);
  if (token === 403 || !token) {
    res
      .status(403)
      .send('Incorrect login or password')
      .end();
  } else {
    res.json({
      status: 200,
      message: 'Successful login',
      token
    });
  }
});

module.exports = router;
