const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config.js');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send('Access token is missing or invalid')
          .end();
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res
      .status(401)
      .send('Access token is missing or invalid')
      .end();
  }
};

module.exports = checkToken;
