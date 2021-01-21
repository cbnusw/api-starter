const { NOT_FOUND } = require('./');

exports.notFound = (req, res, next) => next(NOT_FOUND);

exports.errorHandler = (err, req, res) => {
  const status = err.status || 500;
  const code = err.code || 'SERVER_ERROR';
  const message = err.message || '서버 에러';

  const response = {
    success: false,
    status,
    code,
    message,
  };

  console.error(err);
  res.status(status).json(response);
};
