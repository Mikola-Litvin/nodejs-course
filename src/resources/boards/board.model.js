const uuid = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({
    id = uuid(),
    title = 'Board Title',
    columns = [new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  // static toResponse(user) {
  //   const { id, name, login } = user;
  //   return { id, name, login };
  // }
}

module.exports = Board;
