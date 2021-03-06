const { Schema } = require('mongoose');
const { createSchema } = require('./helpers');
const { searchPlugin } = require('./plugins');
const { toRegEx } = require('./mapper');

const schema = createSchema({
  title: {
    type: String,
    trim: true,
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true,
  }
});

schema.index({ createdAt: -1 });

schema.plugin(searchPlugin({
  populate: [{ path: 'writer', select: 'name' }],
  mapper: {
    title: toRegEx
  },
  sort: '-createdAt'
}));

module.exports = schema;
