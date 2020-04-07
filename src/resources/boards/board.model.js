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
}

module.exports = Board;
