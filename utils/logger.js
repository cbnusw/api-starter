const winston = require('winston');
const moment = require('moment-timezone');
const { join } = require('path');
require('winston-daily-rotate-file');
const { LOG_LEVEL, IS_DEV } = require('../env');

const format = winston.format.printf(
  ({ level, message }) => {
    const timestamp = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    return `${timestamp}|${level.toUpperCase()}|${message}`;
  }
);

const transports = [
  new winston.transports.DailyRotateFile({
    filename: join(__dirname, '..', 'logs', '%DATE%.log'),
    zippedArchive: false,
    format,
    handleExceptions: true,
  })
];

if (IS_DEV) {
  transports.push(new winston.transports.Console({
    format,
    handleExceptions: true,
    colorize: true,
  }));
}

const logger = winston.createLogger({
  level: LOG_LEVEL || 'debug',
  transports
});

logger.stream = {
  write: function (message) {
    logger.info(message);
  }
}

module.exports = logger;
