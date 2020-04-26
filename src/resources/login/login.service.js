const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const loginUser = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) return 403;
  if (!(await bcrypt.compare(password, user.password))) return 403;
  const { id } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
};

module.exports = { loginUser };
