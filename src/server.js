const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const User = require('./resources/users/user.model');
const Board = require('./resources/boards/board.model');
const Task = require('./resources/tasks/task.model');

const users = new Array(1)
  .fill('')
  .map(() => new User({ name: 'admin', login: 'admin', password: 'admin' }));

const boards = new Array(1).fill('').map(
  () =>
    new Board({
      title: 'Board1',
      columns: [
        {
          title: 'Column1',
          order: 0
        }
      ]
    })
);

const tasks = new Array(1).fill('').map(
  () =>
    new Task({
      title: 'task1',
      order: 0,
      description: 'description',
      userId: users[0].id,
      boardId: boards[0].id,
      columnId: boards[0].columns[0].id
    })
);

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Database connection established');
  await db.dropDatabase();
  users.forEach(user => user.save());
  boards.forEach(board => board.save());
  tasks.forEach(task => task.save());
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
