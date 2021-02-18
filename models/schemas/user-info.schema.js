const { Schema } = require('mongoose');
const { createSchema } = require('./helpers');
const { searchPlugin } = require('./plugins');
const { toRegEx } = require('./mapper');

const schema = createSchema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  }
});

schema.plugin(searchPlugin({
  sort: 'name',
  mapper: {
    name: toRegEx,
  }
}));

module.exports = schema;