const { Schema, Types } = require('mongoose');
const { debug } = require('../../../utils/logger');

module.exports = (schema, options = {}) => {
  if (options === false) {
    options = { _id: false, versionKey: false };
  } else if (options.timestamps === false) {
    delete options.timestamps;
  } else {
    const createdAt = options.createdAt === undefined ? true : options.createdAt;
    const updatedAt = options.updatedAt === undefined ? true : options.updatedAt;
    delete options.createdAt;
    delete options.updatedAt;
    options.timestamps = { createdAt, updatedAt };
  }

  let { deletedAt } = options;
  delete options.deletedAt;

  if (deletedAt === true) deletedAt = 'deletedAt';
  if (typeof deletedAt !== 'string') deletedAt = false;
  if (deletedAt) schema[deletedAt] = { type: Date, default: null };

  options = { collation: { locale: 'ko' }, ...options };

  const s = new Schema(schema, options);

  if (deletedAt) {
    s.statics.delete = function (condition) {
      debug('Call delete from mongo instance');
      const $set = {};
      $set[deletedAt] = new Date();
      return this.updateMany(condition, { $set });
    };

    s.statics.deleteById = function (id) {
      debug('Call deleteById from mongo instance');
      const $set = {};
      $set[deletedAt] = new Date();
      if (typeof id === 'string') id = Types.ObjectId(id);
      return this.updateOne({ _id: id }, { $set });
    };

    s.methods.delete = function () {
      debug('Call delete method from mongo instance');
      this[deletedAt] = new Date();
      return this.save();
    }
  }

  return s;
};
