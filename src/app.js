/* eslint-disable no-unused-vars */
const { finished } = require('stream');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send(
      'Service is running! Read README.md for checking Logging & Error Handling task.'
    );
    return;
  }
  next();
});

app.use((req, res, next) => {
  const { url, query, body } = req;
  let queryString = '';
  let bodyString = '';

  if (Object.values(query).length) {
    for (const key in query) {
      if ({}.hasOwnProperty.call(query, key)) {
        queryString = `${queryString}${key}=${query[key]} `;
      }
    }
  } else {
    queryString = 'not transmitted';
  }

  if (Object.values(body).length) {
    for (const key in body) {
      if ({}.hasOwnProperty.call(body, key)) {
        bodyString = `${bodyString}${key}=${body[key]} `;
      }
    }
  } else {
    bodyString = 'not transmitted';
  }

  // eslint-disable-next-line callback-return
  next();

  finished(res, () => {
    console.log(
      `url: ${url}, query parameters: ${queryString}, request body: ${bodyString}`
    );
  });
});

process.on('uncaughtException', error => {
  console.error(`Captured error: ${error.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  throw reason;
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send(`${err}`);
});

module.exports = app;
