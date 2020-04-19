const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const User = require('./resources/users/user.model');

const users = new Array(1)
  .fill('')
  .map(() => new User({ name: 'User1', login: 'user1', password: 'qwerty' }));

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
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
