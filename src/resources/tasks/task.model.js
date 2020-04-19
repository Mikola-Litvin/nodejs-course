const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    // eslint-disable-next-line no-bitwise
    userId: String | Boolean,
    // eslint-disable-next-line no-bitwise
    boardId: String | Boolean,
    // eslint-disable-next-line no-bitwise
    columnId: String | Boolean,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
