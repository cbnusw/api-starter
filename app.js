const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const { stream } = require('./utils/logger');
const { notFound, errorHandler } = require('./errors/handlers');
const { IS_DEV } = require('./env');

const router = require('./routes');

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan(IS_DEV ? 'dev' : 'combined', { stream }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use(router);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
