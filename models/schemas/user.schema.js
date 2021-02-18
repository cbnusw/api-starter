const { Schema } = require('mongoose');
const { createSchema } = require('./helpers');

const schema = createSchema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  hashedPassword: String,
  role: {
    type: String,
    enum: ['admin', 'operator', 'member'],
    default: 'member'
  },
  info: {
    type: Schema.Types.ObjectId,
    ref: 'UserInfo',
    default: null,
  }
}, {
  createdAt: 'joinedAt',
  updatedAt: false,
});

module.exports = schema;
