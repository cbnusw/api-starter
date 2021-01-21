const { readdirSync } = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');
const { error, debug } = require('../utils/logger');
const { MONGO_URI, MONGO_POOL_SIZE } = require('../env');
const { toCollectionName, toModelName } = require('./helpers');

const models = {};

const options = {
  poolSize: +MONGO_POOL_SIZE,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose.connect(MONGO_URI, options);

const db = mongoose.connection;

db.on('error', error.bind(null, 'mongo connection error'));
db.on('open', debug.bind(null, 'mongo connected'));

readdirSync(join(__dirname, 'schemas'))
  .filter(file => /\.schema\.js$/.test(file))
  .forEach(file => {
    const modelName = toModelName(file);
    const collectionName = toCollectionName(file);
    const schema = require(join(__dirname, 'schemas', file));
    models[modelName] = mongoose.model(modelName, schema, collectionName);
  });

module.exports = models;
